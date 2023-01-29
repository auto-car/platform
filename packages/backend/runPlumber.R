is_plumber_available <- require("plumber")
is_sourcetools_available <- require("sourcetools")
is_seurat_available <- require("Seurat")
is_tidyverse_available <- require("tidyverse")
is_dplyr_available <- require("dplyr")
is_patchwork_available <- require("patchwork")
is_ggplot2_available <- require("ggplot2")

if (!is_plumber_available) {
    install.packages("plumber", repos = "http://cran.us.r-project.org")
}

if (!is_sourcetools_available) {
    install.packages("sourcetools", repos = "http://cran.us.r-project.org")
}

if (!is_seurat_available) {
    install.packages("Seurat", repos = "http://cran.us.r-project.org")
}

if (!is_tidyverse_available) {
    install.packages("tidyverse", repos = "http://cran.us.r-project.org")
}

if (!is_dplyr_available) {
    install.packages("dplyr", repos = "http://cran.us.r-project.org")
}

if (!is_patchwork_available) {
    install.packages("patchwork", repos = "http://cran.us.r-project.org")
}

if (!is_ggplot2_available) {
    install.packages("ggplot2", repos = "http://cran.us.r-project.org")
}

library("plumber")
library("sourcetools")
library("Seurat")
library("tidyverse")
library("dplyr")
library("patchwork")
library("ggplot2")

pr("plumber.R") %>%
    pr_run(port = 8000)