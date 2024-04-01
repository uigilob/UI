
!function () {
    Object.defineProperty(window, "$http", {
        value: {
            worker__: function (type, request, data, options) {
                var http_data = JSON.stringify(data);
                xhr_http = new XMLHttpRequest();

                if (typeof options != "object") {
                    options = {}
                    options.status = 200;
                }

                /*not status conf defulat is 200*/
                if (typeof options == "object" && options != null && !("status" in options)) {
                    options.status = 200
                }
                /*responseType*/
                if (typeof options == "object" && options != null && "responseType" in options) {
                    xhr_http.responseType = options.responseType
                }

                if (type == 'POST') {
                    xhr_http.open(type, request, true);
                }

                else if (typeof data == "object" && data != null) {
                    var urlEncodedString_from_object = Object.keys(data).map(function (k) {
                        fm = ""
                        if (data[k] instanceof Array) {
                            fm = data[k].map(function (v) { return `${encodeURIComponent(k)}=${encodeURIComponent(v)}` }).join('&');
                        }
                        else {
                            fm = `${encodeURIComponent(k)}=${encodeURIComponent(data[k])}`
                        }
                        return fm
                    }).join('&');
                    xhr_http.open(type, request + "?" + new String(urlEncodedString_from_object), true);
                }
                else {
                    xhr_http.open(type, request, true);
                }
                /*overrideMimeType*/
                if (typeof options == "object" && options != null && "overrideMimeType" in options) {
                    xhr_http.overrideMimeType(new String(options.overrideMimeType))
                }
                /*setRequestHeader*/
                if (typeof options == "object" && options != null && "headers" in options) {
                    if (typeof options.headers == "object" && options.headers != null)
                        for (k of Object.keys(options.headers)) {
                            xhr_http.setRequestHeader(new String(k), new String(options.headers[k]))
                        }
                }


                var UploadProgress = 0, Uplaod_Interval_stop = false;
                xhr_http.upload.onprogress = function (event) {


                    var progressUpdateInterval = setInterval(function () {
                        var percentComplete = (event.loaded / event.total) * 100;
                        if (percentComplete !== UploadProgress) {
                            UploadProgress = percentComplete;
                        }
                        if (xhr_http.readyState == 4) {
                            UploadProgress = 100
                            Uplaod_Interval_stop = true

                            clearInterval(progressUpdateInterval);
                        }

                    }); //Interval

                };



                var [connect, prossing_status] = [xhr_http, true];
                var data_return = {
                    uploadProgress: function (func) {
                        var UploadInterval = setInterval(function () {
                            func.call(connect, UploadProgress)
                            if (connect.readyState == 4) {

                                clearInterval(UploadInterval)
                            }
                        })
                        return data_return;
                    }, //wait
                    on: function (func) {
                        connect.addEventListener('load', func)
                        return data_return;
                    },//on
                    wait: function (func) {
                        func.call();
                        return data_return;
                    }, //wait
                    downloadProgress: function (func) {
                        var lastProgress = 0;
                        connect.onprogress = function (event) {
                            xhr = this
                            var progressUpdateInterval = setInterval(function () {
                                if (xhr.readyState === XMLHttpRequest.LOADING) {
                                    var percentComplete = (event.loaded / event.total) * 100;
                                    if (percentComplete !== lastProgress) {
                                        lastProgress = percentComplete;
                                        func.call(xhr, lastProgress, progressUpdateInterval)
                                    }
                                } else if (xhr.readyState == 4) {  //1 sec before loaded compliter
                                    lastProgress = 100
                                    func.call(xhr, lastProgress, progressUpdateInterval)
                                    clearInterval(progressUpdateInterval);

                                }
                            }); //Interval
                        }
                        return data_return;
                    }, //wait

                    done: function (func) {
                        connect.addEventListener('loadend', function () {
                            if (this.readyState === this.DONE) {
                                if (this.status === options.status) {
                                    if (prossing_status == true) {
                                        func.call(this.response, this.response, this)

                                    }
                                }
                            }
                        });
                        return data_return;
                    },//done
                    error: function (func) {
                        connect.addEventListener('loadend', function () {
                            if (!(this.status == options.status)) {
                                if (prossing_status == true) {
                                    func();
                                }
                            }
                        });
                        return data_return;
                    },//error

                }//data_return

                /*body*/
                if (typeof options == "object" && options != null && "body" in options) {
                    connect.send(options.body)
                }
                else {
                    connect.send(null);
                }

                /*set time*/

                data_return.timeOut = function (time, fun) {
                    setTimeout(function () {
                        if (!(connect.status == options.status)) {
                            if (typeof fun == "function") {
                                fun.call(connect, connect)
                            }
                            connect.abort();
                        }
                    }, time)
                    return data_return
                }

                /*cancel*/
                data_return.abort = function (fun) {
                    if (typeof fun == "function") { fun.call(connect, connect) }
                    connect.abort();
                    return data_return
                }


                return data_return;
            },//end  worker__


            get: function (request, data, options) {
                var connect = this.worker__("GET", request, data, options);
                return connect;
            },

            post: function (request, options) {
                var connect = this.worker__("POST", request, null, options);
                return connect;
            },

        }, writable: false
    });

}();
