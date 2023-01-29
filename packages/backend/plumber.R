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
    list(msg = paste("🚀🚀 AutoCAR Platform Analytics looking healthy!!"))
}

#* Health Check
#* @get /health
function() {
    list(msg = paste("🚀🚀 AutoCAR Platform Analytics looking healthy!!"))
}

#* Text File Test
#* @param f:file
#* @post /upload-echo
function(f) {
    content <- f[[1]]
    list(msg = paste(content))
}

#* 10X Dataset
#* @param files:[file] dataset_name:string
#* @post /upload-10X
function(files, dataset_name) {
    print(paste("======= Creating Dataset ",
        paste(dataset_name, " =======", sep = ""), sep = "")
    )

    dir_name <- paste("data/", dataset_name, sep = "")
    dir.create(dir_name, showWarnings = FALSE, recursive = TRUE)
    file_names <- names(files)
    file_path_prefix <- paste(dir_name, "/", sep = "")
    file_index <- 1

    for (file in files) {
        file_type <- typeof(file)
        file_name <- file_names[file_index]
        file_path <- paste(file_path_prefix, str_trim(file_name), sep = "")
        if (file_type == "raw") {
            file_content <- rawToChar(as.raw(file))
        } else {
            file_content <- file[[1]]
        }
        write(file_content, file = file_path)
        print(paste("======= -> wrote file ",
            paste(file_path, " =======", sep = ""),
        sep = ""))
        file_index <- file_index + 1
    }

    list(msg = paste("Dataset created successfully"))
}

#* List Datasets
#* @get /datasets
function() {
    datasets <- list.dirs(path = "./data", full.names = TRUE, recursive = TRUE)
    amended_datasets <- datasets[- 1]
    for (index in seq_along(length(amended_datasets))) {
        amended_datasets[[index]] <- str_split(
            amended_datasets[[index]], "./data/"
        )[[1]][2]
    }
    amended_datasets
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
    ggsave(output_image_filename, plot_output)
}