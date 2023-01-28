# plumber.R
#@apiTitle AutoCAR Platform Analytics Application

#* Base Endpoint
#* @get /
function() {
    list(msg=paste('🚀🚀 AutoCAR Platform Analytics - Base Endpoint.'));
}

#* Health Check
#* @get /health
function() {
    list(msg=paste('🚀🚀 AutoCAR Platform Analytics looking healthy!!'));
}