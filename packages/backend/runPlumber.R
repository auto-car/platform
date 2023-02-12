is_plumber_available <- require("plumber")
is_seurat_available <- require("Seurat")
is_sourcetools_available <- require("sourcetools")
is_tidyverse_available <- require("tidyverse")
is_dplyr_available <- require("dplyr")
is_patchwork_available <- require("patchwork")
is_ggplot2_available <- require("ggplot2")

if (!is_plumber_available) {
    install.packages("plumber", repos = "http://cran.us.r-project.org")
}

if (!is_seurat_available) {
    print("Requires Seurat installation")
    install.packages("Seurat", repos = "http://cran.us.r-project.org")
}

if (!is_sourcetools_available) {
    print("Requires Sourcetools installation")
    install.packages("sourcetools", repos = "http://cran.us.r-project.org")
}

if (!is_tidyverse_available) {
    print("Requires Tidyverse installation")
    install.packages("tidyverse", repos = "http://cran.us.r-project.org")
}

if (!is_dplyr_available) {
    print("Requires Dplyr installation")
    install.packages("dplyr", repos = "http://cran.us.r-project.org")
}

if (!is_patchwork_available) {
    print("Requires Patchwork installation")
    install.packages("patchwork", repos = "http://cran.us.r-project.org")
}

if (!is_ggplot2_available) {
    print("Requires ggplot2 installation")
    install.package("ggplot2", repos = "http://cran.us.r-project.org")
}

library("plumber")
library("Seurat")
library("sourcetools")
sessionInfo()
library("tidyverse")
library("dplyr")
library("patchwork")
library("ggplot2")

pr("plumber.R") %>%
    pr_run(port = 8000, host = "0.0.0.0")