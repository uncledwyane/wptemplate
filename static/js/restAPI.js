function RestApi(serverURI) {
    axios.defaults.timeout = 10000;
    axios.defaults.baseURL = document.location.protocol + '//' + serverURI + '/sdkapi/v2';
    
    function fetchGet(url, params) {
    	var deferred = when.defer();
       
        axios.get(url, params).then(function(response) {
                if (response.data.ret === 0) {
                    deferred.resolve(response.data);
                } else {
                    deferred.reject(response.data);
                }
            }).catch(function(error) {
                if (error.response) {
                    // 服务器返回正常的异常对象
                    var data = {
                        ret: error.response.status,
                        msg: error.response.data
                    }
                    deferred.reject(data);
                } else {
                    // 服务器发生未处理的异常
                    var data = {
                        ret: 10000,
                        msg: error.message,
                    }
                    deferred.reject(data);
                }
                deferred.reject(error)
            })
      	return deferred.promise;
    }
    
    function fetchPost(url, params) {
    	var deferred = when.defer();
		axios.post(url, params,{headers: {'Content-Type': 'multipart/form-data'}}).then(function(response) {
				if (response.data.ret === 0) {
					deferred.resolve(response.data.data);
				} else {
					var error = {
		        		code:response.data.ret,
		        		message:response.data.msg
		        	}
	            	deferred.reject(error);
				}
			}).catch(function(error) {
				if (error.response) {
					// 服务器返回正常的异常对象
					var errorObj = new Error(error.response.status, error.response.data);
					deferred.reject(errorObj);
			    } else {
					// 服务器发生未处理的异常
					var errorObj = new Error(10000, error.message);
					deferred.reject(errorObj);
                }
	            deferred.reject(error);
			})
    	
    	
    	return deferred.promise;
    }

    /**
     * 获取访问令牌
     * @param {String} access_key 
     * @param {String} secret_key 
     */
    this.getAccessToken = function(access_key, secret_key) {
        return fetchGet('/app/get_token', { params: { "access_key": access_key, "secret_key": secret_key } });
    }

    /**
     * 创建房间
     * @param {String} token-访问令牌
     * @param {String} topic-会议主题 
     * @param {Boolean} enable_auto_cloud_recording-是否开启云端自动录制，默认false
     * @param {String} user_id-房间创建者用户ID 
     * @param {String} room_id-指定房间ID，如果不传服务器生成随机号
     * @param {Boolean} enable_auto_avc-是否启用自动视频AVC模式（视频合屏），默认false
     */
    this.createRoom = function(token, topic, user_id, room_id, enable_auto_cloud_recording, enable_auto_avc) {
        var paramsObj = {
            "token": token,
            "topic": topic,
            "user_id": user_id,
        }

        if (room_id) {
            paramsObj.room_id = room_id;
        }

        if (enable_auto_cloud_recording) {
            paramsObj.enable_auto_cloud_recording = enable_auto_cloud_recording;
        }

        if (enable_auto_avc) {
            paramsObj.enable_auto_avc = enable_auto_avc;
        }

        return fetchGet('/room/create', { params: paramsObj });
    }
}
