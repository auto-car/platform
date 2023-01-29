is_plumber_available <- require("plumber");
is_sourcetools_available <- require("sourcetools");
is_seurat_available <- require("Seurat");
is_tidyverse_available <- require("tidyverse");
is_dplyr_available <- require("dplyr");
is_patchwork_available <- require("patchwork");

if (!is_plumber_available) {
    install.packages("plumber", repos = "http://cran.us.r-project.org");
    install.packages("sourcetools", repos = "http://cran.us.r-project.org");
    install.packages("Seurat", repos = "http://cran.us.r-project.org");
    install.packages("tidyverse", repos = "http://cran.us.r-project.org");
    install.packages("dplyr", repos = "http://cran.us.r-project.org");
    install.packages("patchwork", repos = "http://cran.us.r-project.org");
}

library("plumber");
library("sourcetools");
library("Seurat");
library("tidyverse");
library("dplyr");
library("patchwork");

pr("plumber.R") %>%
    pr_run(port = 8000)