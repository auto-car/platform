FROM rocker/tidyverse
LABEL org.opencontainers.image.authors="Docker User <docker@user.org>"

RUN R -e "options(warn = 2); install.packages('plumber', repos = 'https://cran.rstudio.com/', dependencies = TRUE)"
RUN R -e "options(warn = 2); install.packages('broom', repos = 'https://cran.rstudio.com/', dependencies = TRUE)"
RUN R -e "options(warn = 2); install.packages('sourcetools', repos = 'https://cran.rstudio.com/', dependencies = TRUE)"
# RUN R -e "options(warn = 2); install.packages('Seurat', repos = 'https://cran.rstudio.com/', dependencies = TRUE)"
RUN R -e "options(warn = 2); install.packages('tidyverse', repos = 'https://cran.rstudio.com/', dependencies = TRUE)"
RUN R -e "options(warn = 2); install.packages('dplyr', repos = 'https://cran.rstudio.com/', dependencies = TRUE)"
RUN R -e "options(warn = 2); install.packages('patchwork', repos = 'https://cran.rstudio.com/', dependencies = TRUE)"
RUN R -e "options(warn = 2); install.packages('ggplot2', repos = 'https://cran.rstudio.com/', dependencies = TRUE)"

COPY . .

CMD ["sessionInfo()"]