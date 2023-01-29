# plumber.R
#@apiTitle AutoCAR Platform Analytics Application

#* Base Endpoint
#* @get /
function() {
    list(msg=paste('🚀🚀 AutoCAR Platform Analytics looking healthy!!'));
}

#* Health Check
#* @get /health
function() {
    list(msg=paste('🚀🚀 AutoCAR Platform Analytics looking healthy!!'));
}

#* Text File Test
#* @param f:file
#* @post /upload-echo
function(f) {
    content <- f[[1]];
    list(msg=paste(content))
}

#* 10X Dataset
#* @param files:[file] datasetName:string
#* @post /upload-10X
function(files, datasetName) {
    print(datasetName)
    dir_name = paste(datasetName, '-data', sep="");
    dir.create(dir_name, showWarnings = FALSE);
    idx = 1;
    file_names = names(files);
    file_path_prefix = paste(dir_name, "/", sep="");
    for (file in files)
    {
        file_content <- file[[1]];
        file_name <- file_names[idx];
        file_path = paste(file_path_prefix, str_trim(file_name), sep="");
        write(file_content, file = file_path);
        idx = idx + 1;
    }
}