is_plumber_available <- require("plumber");

if (!is_plumber_available) {
    install.packages("plumber", repos = "http://cran.us.r-project.org");
}

library("plumber");
pr("plumber.R") %>%
    pr_run(port = 8000)