library("Seurat")
library("tidyverse")
library("dplyr")
library("ggplot2")
library("patchwork")

# plumber.R
#@apiTitle AutoCAR Platform Analytics Application

#* Base Endpoint
#* @get /
function() {
    "🚀🚀 AutoCAR Platform R Service looking healthy!!"
}

#* Health Check
#* @get /health
function() {
    "🚀🚀 AutoCAR Platform R Service looking healthy!!"
}

#* Text File Test
#* @param f:file
#* @post /upload-echo
function(f) {
    content <- f[[1]]
    list(msg = paste(content))
}

#* Create a new Dataset Collection
#* @param collection:string team_name:string
#* @post /collection
function(collection, team_name) {
    print(paste("====== Creating Collection ",
     paste(collection, " ======", sep = ""), sep = ""))

    dir_name <- paste("data/", team_name, sep = "")
    dir_name <- paste(dir_name, "/", sep = "")
    dir_name <- paste(dir_name, collection, sep = "")
    dir.create(dir_name, showWarnings = FALSE, recursive = TRUE)

    list(msg = paste("Collection created successfully"))
}

#* Upload a Dataset (10X Format)
#* @param files:[file] name:string collection:string team:string
#* @post /upload-10X
function(files, name, collection, team) {
    print(paste("======= Creating Dataset ",
        paste(name, " =======", sep = ""), sep = "")
    )
    fnames <- names(files)
    dir_name_prefix <- paste("data/", team, sep = "")
    dir_name_prefix <- paste(dir_name_prefix, "/", sep = "")
    dir_name_prefix <- paste(dir_name_prefix, collection, sep = "")
    dir_name_prefix <- paste(dir_name_prefix, "/", sep = "")

    dir_name <- paste(dir_name_prefix, name, sep = "")
    dir.create(dir_name, showWarnings = FALSE, recursive = TRUE)

    file_names <- names(files)
    file_path_prefix <- paste(dir_name, "/", sep = "")
    file_index <- 1

    dataset_object <- c()
    total_size <- 0

    for (file in files) {
        file_type <- typeof(file)
        file_name <- file_names[file_index]
        file_path <- paste(file_path_prefix, str_trim(file_name), sep = "")
        if (file_type == "raw") {
            file_content <- rawToChar(as.raw(file))
        } else {
            file_content <- file[[1]]
        }
        write(trimws(file_content), file = file_path, sep = "")
        print(paste("======= -> wrote file ",
            paste(file_path, " =======", sep = ""),
        sep = ""))
        ## Add to total megabytes size
        total_size <- total_size + (file.size(file_path) * 0.000001)
        file_index <- file_index + 1
    }

    dataset_object[["files"]] <- fnames
    dataset_object[["totalSize"]] <- total_size
    dataset_object[["name"]] <- name
    dataset_object[["hasOutput"]] <- FALSE

    dataset_object
}

#* List Datasets
#* @get /datasets
function() {
    datasets <- list.dirs(path = "./data", full.names = TRUE, recursive = TRUE)
    #
    # Datasets contains a top to bottom list of the dir structure. Example:
    # ./data
    # ./data/UNSW Immunogenomics
    # ./data/UNSW Immunogenomics/abseq
    # ./data/UNSW Immunogenomics/dataset-2
    # ./data/UNSW Immunogenomics/car-t-cells
    # ./data/10X Genomics
    # ./data/10X Genomics/abseq
    # ./data/10X Genomics/hello
    # ./data/10X Genomics/there
    #

    ## Goal: extract a map between category (key) and dataset (value)
    ## Eg:
    ## {
    ##  category: "UNSW Immunogenomics",
    ##  datasets: [
    ##    {
    ##      name: "abseq",
    ##      createdAt: Date String,
    ##      updatedAt: Date String,
    ##      hasOutput: boolean, (whether UMAP has been
    ##                  generated for this already)
    ##    }
    ##  ]
    ## }

    if (length(datasets) <= 1) {
        list()
    } else {
        amended_datasets <- datasets[- 1]
        added_categories <- 0
        added_datasets <- 1
        final_list <- list()
        category <- ""
        category_object <- list()

        for (index in seq(from = 1, to = length(amended_datasets))) {
            dir_value <- amended_datasets[[index]]
            no_of_slash <- lengths(regmatches(dir_value,
            gregexpr("/", dir_value)))

            if (no_of_slash == 2) {
                if (added_categories > 0) {
                    final_list[[added_categories]] <- category_object
                }
                added_categories <- added_categories + 1
                category <- str_split(dir_value, "./data/")[[1]][2]
                category_object <- list()
                category_object[["category"]] <- category
                category_object[["datasets"]] <- list()
                added_datasets <- 1
            } else {
                str_to_split <- paste("./data/", category, sep = "")
                dataset_name <- str_split(dir_value, str_to_split)[[1]][2]
                dataset_created_at <- file.info(dir_value)$ctime
                dataset_updated_at <- file.info(dir_value)$mtime

                expected_output_path_prefix <- paste(dir_value, "/", sep = "")
                expected_output_path <- paste(
                    expected_output_path_prefix,
                    "output.png",
                    sep = ""
                )
                dataset_has_output <- file.exists(expected_output_path)

                dataset_object <- c()
                dataset_object[["name"]] <- dataset_name
                dataset_object[["createdAt"]] <- dataset_created_at
                dataset_object[["updatedAt"]] <- dataset_updated_at
                dataset_object[["hasOutput"]] <- dataset_has_output

                category_object[["datasets"]][[added_datasets]] <- dataset_object
                added_datasets <- added_datasets + 1
            }
        }

        final_list[[added_categories]] <- category_object

        final_list
    }
}

#* Download UMAP Image for Dataset
#* @serializer contentType list(type="image/png")
#* @param dataset The dataset to get a umap from
#* @get /download-umap
function(dataset) {
    dataset_dir <- paste("./data/", dataset, sep = "")
    handle_umap(dataset_dir, dataset)

    output_image_filename <- paste(dataset_dir, "/output.png", sep = "")
    readBin(
        output_image_filename, "raw", n = file.info(output_image_filename)$size
    )
}

handle_umap <- function(dataset_dir, dataset_project) {
    ## Data loading
    ## Load the data
    dataset <- Read10X(data.dir = dataset_dir, gene.column = 1)
    ## Initialize a Seurat object with the raw (non-normalized) data:
    dataset <- CreateSeuratObject(counts = dataset, project = dataset_project)

    ## Basic QC
    ## Store the mitochondrial percentage count
    dataset[["percent.mt"]] <- PercentageFeatureSet(dataset, pattern = "^MT-")

    ## Filter out cells that have > 200 and < 2500 nFeature_RNA,
    ## and < 5% mitochondrial count %
    dataset <- subset(dataset,
        subset = nFeature_RNA > 200 & nFeature_RNA < 2500 & percent.mt < 5
    )

    ## Normalization
    ## Normalize the data
    dataset <- NormalizeData(dataset)

    ## Feature Selection
    ## Calculate the subset of features that exhibit high cell to cell
    ## variation in the dataset. This means highly expressed in some, lowly
    ## in others -> focusing on these genes helps to highlight biological
    ## signal in sc datasets.
    dataset <- FindVariableFeatures(dataset, selection.method = "vst")

    ## Scale the Data
    ## Apply linear transformation ("scaling") -> standard pre-processing
    ## step prior to dimension reduction techniques like PCA.
    genes <- rownames(dataset)
    dataset <- ScaleData(dataset, features = genes)

    ## PCA
    ## Now, perform PCA on the scaled data. By default, only the previously
    ## determined variable features are used as input, but a different
    ## subset can be used
    dataset <- RunPCA(dataset)

    ## Clustering
    ## Cluster the Cells
    dataset <- FindNeighbors(dataset, dims = 1:10)
    dataset <- FindClusters(dataset, resolution = 0.5)

    ## Non Linear Dim Reduction
    ## Run the UMAP Algorithm and return the image\
    dataset <- RunUMAP(dataset, dims = 1:10)
    plot_output <- DimPlot(dataset, reduction = "umap", label = TRUE)

    output_image_filename <- paste(dataset_dir, "/output.png", sep = "")
    ggsave(output_image_filename, plot_output, width = 16, height = 9)
}