FROM rocker/r-ver:4.2.1

EXPOSE 8000

RUN apt-get update -qq && apt-get install -y \
  libssl-dev \
  libcurl4-gnutls-dev \ 
  libgeos-dev \
  libxml2-dev \
  libpng-dev \
  libhdf5-dev \
  libfftw3-dev \
  libgsl-dev \
  pkg-config \
  libboost-all-dev \
  libglpk-dev

RUN mkdir -p app

COPY .  app
WORKDIR /app

RUN R -e "install.packages(c('plumber', 'sourcetools', 'tidyverse', 'dplyr', 'patchwork', 'ggplot2'))"
RUN R -e "install.packages('Seurat', dependencies = TRUE)"

ENTRYPOINT ["Rscript", "runPlumber.R"]