/**
 * User: Jinqn
 * Date: 14-04-08
 * Time: 下午16:34
 * 上传图片对话框逻辑代码,包括tab: 远程图片/上传图片/在线图片/搜索图片
 */

(function() {
  var remoteImage,
    uploadImage,
    onlineImage,
    searchImage,
    dir,
    host,
    new_multipart_params,
    upType,
    oss_domain,
    timeStamp = new Date().getTime()

  window.onload = function() {
    initTabs()
    initAlign()
    initButtons()
  }
  function send_request() {
    var xmlhttp = null
    if (window.XMLHttpRequest) {
      xmlhttp = new XMLHttpRequest()
    } else if (window.ActiveXObject) {
      xmlhttp = new ActiveXObject('Microsoft.XMLHTTP')
    }

    if (xmlhttp != null) {
      serverUrl = editor.getOpt('signature')
      xmlhttp.open('post', serverUrl, false)
      var timeStamp1 = new Date().getTime()
      var key1 = 'Hnszwhg'
      var secret1 = 'hNsZwhg@2019'
      xmlhttp.setRequestHeader('key', key1)
      xmlhttp.setRequestHeader('secret', secret1)
      xmlhttp.setRequestHeader('timestamp', timeStamp1)
      xmlhttp.setRequestHeader('sign', hex_md5(key1 + timeStamp1 + secret1))
      xmlhttp.setRequestHeader('refererer', window.location.href)
      xmlhttp.send(null)
      var res = JSON.parse(window.atob(xmlhttp.responseText))
      if (res.status.returnCode == 100) {
        var resData = res.data.list[0]
        accessid = resData.accessid
        dir = resData.dir
        host = resData.host
        policyBase64 = resData.policy
        signature = resData.signature
        oss_domain = resData.oss_domain
        expire = resData.expire
        upType = resData.upType
        new_multipart_params = {
          'key': dir,
          'policy': policyBase64,
          'OSSAccessKeyId': accessid,
          'success_action_status': '200', // 让服务端返回200,不然，默认会返回204
          'signature': signature,
          'server': host,
          'expire': expire
        }
      }
      // alert(xmlhttp.responseText)
    } else {
      alert('Your browser does not support XMLHTTP.')
    }
  };
  // 生成文件名中的随机数
  function random_string() {
    var chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'
    var maxPos = chars.length
    var pwd = ''
    for (i = 0; i < 8; i++) {
      pwd += chars.charAt(Math.floor(Math.random() * maxPos))
    }
    return pwd
  };
  send_request()
  /* 初始化tab标签 */
  function initTabs() {
    var tabs = $G('tabhead').children
    for (var i = 0; i < tabs.length; i++) {
      domUtils.on(tabs[i], 'click', function(e) {
        var target = e.target || e.srcElement
        setTabFocus(target.getAttribute('data-content-id'))
      })
    }

    var img = editor.selection.getRange().getClosedNode()
    if (img && img.tagName && img.tagName.toLowerCase() == 'img') {
      setTabFocus('remote')
    } else {
      setTabFocus('upload')
    }
  }

  /* 初始化tabbody */
  function setTabFocus(id) {
    if (!id) return
    var i, bodyId, tabs = $G('tabhead').children
    for (i = 0; i < tabs.length; i++) {
      bodyId = tabs[i].getAttribute('data-content-id')
      if (bodyId == id) {
        domUtils.addClass(tabs[i], 'focus')
        domUtils.addClass($G(bodyId), 'focus')
      } else {
        domUtils.removeClasses(tabs[i], 'focus')
        domUtils.removeClasses($G(bodyId), 'focus')
      }
    }
    switch (id) {
      case 'remote':
        remoteImage = remoteImage || new RemoteImage()
        break
      case 'upload':
        setAlign(editor.getOpt('imageInsertAlign'))
        uploadImage = uploadImage || new UploadImage('queueList')
        break
      case 'online':
        setAlign(editor.getOpt('imageManagerInsertAlign'))
        onlineImage = onlineImage || new OnlineImage('imageList')
        onlineImage.reset()
        break
      case 'search':
        setAlign(editor.getOpt('imageManagerInsertAlign'))
        searchImage = searchImage || new SearchImage()
        break
    }
  }

  /* 初始化onok事件 */
  function initButtons() {
    dialog.onok = function() {
      var remote = false, list = [], id, tabs = $G('tabhead').children
      for (var i = 0; i < tabs.length; i++) {
        if (domUtils.hasClass(tabs[i], 'focus')) {
          id = tabs[i].getAttribute('data-content-id')
          break
        }
      }

      switch (id) {
        case 'remote':
          list = remoteImage.getInsertList()
          break
        case 'upload':
          list = uploadImage.getInsertList()
          var count = uploadImage.getQueueCount()
          if (count) {
            $('.info', '#queueList').html('<span style="color:red;">' + '还有2个未上传文件'.replace(/[\d]/, count) + '</span>')
            return false
          }
          break
        case 'online':
          list = onlineImage.getInsertList()
          break
        case 'search':
          list = searchImage.getInsertList()
          remote = true
          break
      }

      if (list) {
        editor.execCommand('insertimage', list)
        remote && editor.fireEvent('catchRemoteImage')
      }
    }
  }

  /* 初始化对其方式的点击事件 */
  function initAlign() {
    /* 点击align图标 */
    domUtils.on($G('alignIcon'), 'click', function(e) {
      var target = e.target || e.srcElement
      if (target.className && target.className.indexOf('-align') != -1) {
        setAlign(target.getAttribute('data-align'))
      }
    })
  }

  /* 设置对齐方式 */
  function setAlign(align) {
    align = align || 'none'
    var aligns = $G('alignIcon').children
    for (i = 0; i < aligns.length; i++) {
      if (aligns[i].getAttribute('data-align') == align) {
        domUtils.addClass(aligns[i], 'focus')
        $G('align').value = aligns[i].getAttribute('data-align')
      } else {
        domUtils.removeClasses(aligns[i], 'focus')
      }
    }
  }
  /* 获取对齐方式 */
  function getAlign() {
    var align = $G('align').value || 'none'
    return align == 'none' ? '' : align
  }

  /* 在线图片 */
  function RemoteImage(target) {
    this.container = utils.isString(target) ? document.getElementById(target) : target
    this.init()
  }
  RemoteImage.prototype = {
    init: function() {
      this.initContainer()
      this.initEvents()
    },
    initContainer: function() {
      this.dom = {
        'url': $G('url'),
        'width': $G('width'),
        'height': $G('height'),
        'border': $G('border'),
        'vhSpace': $G('vhSpace'),
        'title': $G('title'),
        'align': $G('align')
      }
      var img = editor.selection.getRange().getClosedNode()
      if (img) {
        this.setImage(img)
      }
    },
    initEvents: function() {
      var _this = this,
        locker = $G('lock')

      /* 改变url */
      domUtils.on($G('url'), 'keyup', updatePreview)
      domUtils.on($G('border'), 'keyup', updatePreview)
      domUtils.on($G('title'), 'keyup', updatePreview)

      domUtils.on($G('width'), 'keyup', function() {
        if (locker.checked) {
          var proportion = locker.getAttribute('data-proportion')
          $G('height').value = Math.round(this.value / proportion)
        } else {
          _this.updateLocker()
        }
        updatePreview()
      })
      domUtils.on($G('height'), 'keyup', function() {
        if (locker.checked) {
          var proportion = locker.getAttribute('data-proportion')
          $G('width').value = Math.round(this.value * proportion)
        } else {
          _this.updateLocker()
        }
        updatePreview()
      })
      domUtils.on($G('lock'), 'change', function() {
        var proportion = parseInt($G('width').value) / parseInt($G('height').value)
        locker.setAttribute('data-proportion', proportion)
      })

      function updatePreview() {
        _this.setPreview()
      }
    },
    updateLocker: function() {
      var width = $G('width').value,
        height = $G('height').value,
        locker = $G('lock')
      if (width && height && width == parseInt(width) && height == parseInt(height)) {
        locker.disabled = false
        locker.title = ''
      } else {
        locker.checked = false
        locker.disabled = 'disabled'
        locker.title = lang.remoteLockError
      }
    },
    setImage: function(img) {
      /* 不是正常的图片 */
      if (!img.tagName || img.tagName.toLowerCase() != 'img' && !img.getAttribute('src') || !img.src) return

      var wordImgFlag = img.getAttribute('word_img'),
        src = wordImgFlag ? wordImgFlag.replace('&amp;', '&') : (img.getAttribute('_src') || img.getAttribute('src', 2).replace('&amp;', '&')),
        align = editor.queryCommandValue('imageFloat')

      /* 防止onchange事件循环调用 */
      if (src !== $G('url').value) $G('url').value = src
      if (src) {
        /* 设置表单内容 */
        $G('width').value = img.width || ''
        $G('height').value = img.height || ''
        $G('border').value = img.getAttribute('border') || '0'
        $G('vhSpace').value = img.getAttribute('vspace') || '0'
        $G('title').value = img.title || img.alt || ''
        setAlign(align)
        this.setPreview()
        this.updateLocker()
      }
    },
    getData: function() {
      var data = {}
      for (var k in this.dom) {
        data[k] = this.dom[k].value
      }
      return data
    },
    setPreview: function() {
      var url = $G('url').value,
        ow = $G('width').value,
        oh = $G('height').value,
        border = $G('border').value,
        title = $G('title').value,
        preview = $G('preview'),
        width,
        height

      width = ((!ow || !oh) ? preview.offsetWidth : Math.min(ow, preview.offsetWidth))
      width = width + (border * 2) > preview.offsetWidth ? width : (preview.offsetWidth - (border * 2))
      height = (!ow || !oh) ? '' : width * oh / ow

      if (url) {
        preview.innerHTML = '<img src="' + url + '" width="' + width + '" height="' + height + '" border="' + border + 'px solid #000" title="' + title + '" />'
      }
    },
    getInsertList: function() {
      var data = this.getData()
      if (data['url']) {
        return [{
          src: data['url'],
          _src: data['url'],
          width: data['width'] || '',
          height: data['height'] || '',
          border: data['border'] || '',
          floatStyle: data['align'] || '',
          vspace: data['vhSpace'] || '',
          alt: data['title'] || '',
          style: 'width:' + data['width'] + 'px;height:' + data['height'] + 'px;'
        }]
      } else {
        return []
      }
    }
  }

  /* 上传图片 */
  function UploadImage(target) {
    this.$wrap = target.constructor == String ? $('#' + target) : $(target)
    this.init()
  }
  UploadImage.prototype = {
    init: function() {
      this.fileLength = 0
      this.fileList = []
      this.imageList = []
      this.initContainer()
      this.initUploader()
    },
    initContainer: function() {
      this.$queue = this.$wrap.find('.filelist')
    },
    /* 初始化容器 */
    initUploader: function() {
      var _this = this,
        $ = jQuery, // just in case. Make sure it's not an other libaray.
        $wrap = _this.$wrap,
        // 图片容器
        $queue = $wrap.find('.filelist'),
        // 状态栏，包括进度和控制按钮
        $statusBar = $wrap.find('.statusBar'),
        // 文件总体选择信息。
        $info = $statusBar.find('.info'),
        // 上传按钮
        $upload = $wrap.find('.uploadBtn'),
        // 上传按钮
        $filePickerBtn = $wrap.find('.filePickerBtn'),
        // 上传按钮
        $filePickerBlock = $wrap.find('.filePickerBlock'),
        // 没选择文件之前的内容。
        $placeHolder = $wrap.find('.placeholder'),
        // 总体进度条
        $progress = $statusBar.find('.progress').hide(),
        // 添加的文件数量
        fileCount = 0,
        // 添加的文件总大小
        fileSize = 0,
        // 优化retina, 在retina下这个值是2
        ratio = window.devicePixelRatio || 1,
        // 缩略图大小
        thumbnailWidth = 113 * ratio,
        thumbnailHeight = 113 * ratio,
        // 可能有pedding, ready, uploading, confirm, done.
        state = '',
        // 所有文件的进度信息，key为file id
        percentages = {},
        supportTransition = (function() {
          var s = document.createElement('p').style,
            r = 'transition' in s || 'WebkitTransition' in s || 'MozTransition' in s || 'msTransition' in s || 'OTransition' in s
          s = null
          return r
        })(),
        // WebUploader实例
        uploader,
        actionUrl = (upType == 'aliyun') ? editor.getActionUrl(editor.getOpt('ossImageActionName')) : editor.getActionUrl(editor.getOpt('imageActionName')),
        acceptExtensions = (editor.getOpt('imageAllowFiles') || ['.png', '.jpg', '.jpeg', '.gif', '.bmp']).join('').replace(/\./g, ',').replace(/^[,]/, ''),
        imageMaxSize = editor.getOpt('imageMaxSize'),
        imageCompressBorder = editor.getOpt('imageCompressBorder')

      if (!WebUploader.Uploader.support()) {
        $('#filePickerReady').after($('<div>').html(lang.errorNotSupport)).hide()
        return
      } else if (!editor.getOpt('imageActionName')) {
        $('#filePickerReady').after($('<div>').html(lang.errorLoadConfig)).hide()
        return
      }

      /* 上传插件 */
      uploader = _this.uploader = WebUploader.create({
        pick: {
          id: '#filePickerReady',
          label: lang.uploadSelectFile
        },
        accept: {
          title: 'Images',
          extensions: acceptExtensions,
          mimeTypes: 'image/jpeg,image/png,image/svg,image/webp,image/gif'
        },
        swf: '../../third-party/webuploader/Uploader.swf',
        server: actionUrl,
        fileVal: editor.getOpt('imageFieldName'),
        duplicate: true,
        fileSingleSizeLimit: imageMaxSize, // 默认 2 M
        compress: false
      })
      uploader.addButton({
        id: '#filePickerBlock'
      })
      uploader.addButton({
        id: '#filePickerBtn',
        label: lang.uploadAddFile
      })

      setState('pedding')

      // 当有文件添加进来时执行，负责view的创建
      function addFile(file) {
        var $li = $('<li id="' + file.id + '">' +
                    '<p class="title">' + file.name + '</p>' +
                    '<p class="imgWrap"></p>' +
                    '<p class="progress"><span></span></p>' +
                    '</li>'),

          $btns = $('<div class="file-panel">' +
                    '<span class="cancel">' + lang.uploadDelete + '</span>' +
                    '<span class="rotateRight">' + lang.uploadTurnRight + '</span>' +
                    '<span class="rotateLeft">' + lang.uploadTurnLeft + '</span></div>').appendTo($li),
          $prgress = $li.find('p.progress span'),
          $wrap = $li.find('p.imgWrap'),
          $info = $('<p class="error"></p>').hide().appendTo($li),
          showError = function(code) {
            switch (code) {
              case 'exceed_size':
                text = lang.errorExceedSize
                break
              case 'interrupt':
                text = lang.errorInterrupt
                break
              case 'http':
                text = lang.errorHttp
                break
              case 'not_allow_type':
                text = lang.errorFileType
                break
              default:
                text = lang.errorUploadRetry
                break
            }
            $info.text(text).show()
          }
        if (file.getStatus() === 'invalid') {
          showError(file.statusText)
        } else {
          $wrap.text(lang.uploadPreview)
          if (browser.ie && browser.version <= 7) {
            $wrap.text(lang.uploadNoPreview)
          } else {
            uploader.makeThumb(file, function(error, src) {
              if (error || !src) {
                $wrap.text(lang.uploadNoPreview)
              } else {
                var $img = $('<img src="' + src + '">')
                $wrap.empty().append($img)
                $img.on('error', function() {
                  $wrap.text(lang.uploadNoPreview)
                })
              }
            }, thumbnailWidth, thumbnailHeight)
          }
          percentages[ file.id ] = [file.size, 0]
          file.rotation = 0

          /* 检查文件格式 */
          if (!file.ext || acceptExtensions.indexOf(file.ext.toLowerCase()) == -1) {
            showError('not_allow_type')
            uploader.removeFile(file, true)
          }
        }

        file.on('statuschange', function(cur, prev) {
          if (prev === 'progress') {
            $prgress.hide().width(0)
          } else if (prev === 'queued') {
            $li.off('mouseenter mouseleave')
            $btns.remove()
          }
          // 成功
          if (cur === 'error' || cur === 'invalid') {
            showError(file.statusText)
            percentages[ file.id ][ 1 ] = 1
          } else if (cur === 'interrupt') {
            showError('interrupt')
          } else if (cur === 'queued') {
            percentages[ file.id ][ 1 ] = 0
          } else if (cur === 'progress') {
            $info.hide()
            $prgress.css('display', 'block')
          } else if (cur === 'complete') {
          }

          $li.removeClass('state-' + prev).addClass('state-' + cur)
        })

        $li.on('mouseenter', function() {
          $btns.stop().animate({ height: 30 })
        })
        $li.on('mouseleave', function() {
          $btns.stop().animate({ height: 0 })
        })

        $btns.on('click', 'span', function() {
          var index = $(this).index(),
            deg

          switch (index) {
            case 0:
              uploader.removeFile(file, true)
              return
            case 1:
              file.rotation += 90
              break
            case 2:
              file.rotation -= 90
              break
          }

          if (supportTransition) {
            deg = 'rotate(' + file.rotation + 'deg)'
            $wrap.css({
              '-webkit-transform': deg,
              '-mos-transform': deg,
              '-o-transform': deg,
              'transform': deg
            })
          } else {
            $wrap.css('filter', 'progid:DXImageTransform.Microsoft.BasicImage(rotation=' + (~~((file.rotation / 90) % 4 + 4) % 4) + ')')
          }
        })

        $li.insertBefore($filePickerBlock)
      }

      // 负责view的销毁
      function removeFile(file) {
        var $li = $('#' + file.id)
        delete percentages[ file.id ]
        updateTotalProgress()
        $li.off().find('.file-panel').off().end().remove()
      }

      function updateTotalProgress() {
        var loaded = 0,
          total = 0,
          spans = $progress.children(),
          percent

        $.each(percentages, function(k, v) {
          total += v[ 0 ]
          loaded += v[ 0 ] * v[ 1 ]
        })

        percent = total ? loaded / total : 0

        spans.eq(0).text(Math.round(percent * 100) + '%')
        spans.eq(1).css('width', Math.round(percent * 100) + '%')
        updateStatus()
      }

      function setState(val, files) {
        if (val != state) {
          var stats = uploader.getStats()

          $upload.removeClass('state-' + state)
          $upload.addClass('state-' + val)

          switch (val) {
            /* 未选择文件 */
            case 'pedding':
              $queue.addClass('element-invisible')
              $statusBar.addClass('element-invisible')
              $placeHolder.removeClass('element-invisible')
              $progress.hide(); $info.hide()
              uploader.refresh()
              break

              /* 可以开始上传 */
            case 'ready':
              $placeHolder.addClass('element-invisible')
              $queue.removeClass('element-invisible')
              $statusBar.removeClass('element-invisible')
              $progress.hide(); $info.show()
              $upload.text(lang.uploadStart)
              uploader.refresh()
              break

              /* 上传中 */
            case 'uploading':
              $progress.show(); $info.hide()
              $upload.text(lang.uploadPause)
              break

              /* 暂停上传 */
            case 'paused':
              $progress.show(); $info.hide()
              $upload.text(lang.uploadContinue)
              break

            case 'confirm':
              $progress.show(); $info.hide()
              $upload.text(lang.uploadStart)

              stats = uploader.getStats()
              if (stats.successNum && !stats.uploadFailNum) {
                setState('finish')
                return
              }
              break

            case 'finish':
              $progress.hide(); $info.show()
              if (stats.uploadFailNum) {
                $upload.text(lang.uploadRetry)
              } else {
                $upload.text(lang.uploadStart)
              }
              break
          }
          state = val
          updateStatus()
        }
        if (!_this.getQueueCount()) {
          $upload.addClass('disabled')
        } else {
          $upload.removeClass('disabled')
        }
      }

      function updateStatus() {
        var text = '', stats

        if (state === 'ready') {
          text = lang.updateStatusReady.replace('_', fileCount).replace('_KB', WebUploader.formatSize(fileSize))
        } else if (state === 'confirm') {
          stats = uploader.getStats()
          if (stats.uploadFailNum) {
            text = lang.updateStatusConfirm.replace('_', stats.successNum).replace('_', stats.successNum)
          }
        } else {
          stats = uploader.getStats()
          text = lang.updateStatusFinish.replace('_', fileCount)
            .replace('_KB', WebUploader.formatSize(fileSize))
            .replace('_', stats.successNum)

          if (stats.uploadFailNum) {
            text += lang.updateStatusError.replace('_', stats.uploadFailNum)
          }
        }

        $info.html(text)
      }

      uploader.on('fileQueued', function(file) {
        /* 选择文件后设置上传相关的url和自定义参数 */
        editor.getOpt('imageUploadService')(_this, editor).setUploadData(file)
        fileCount++
        fileSize += file.size
        if (fileCount === 1) {
          $placeHolder.addClass('element-invisible')
          $statusBar.show()
        }
        addFile(file)
      })

      uploader.on('fileDequeued', function(file) {
        if (file.ext && acceptExtensions.indexOf(file.ext.toLowerCase()) != -1 && file.size <= imageMaxSize) {
          fileCount--
          fileSize -= file.size
        }
        removeFile(file)
        updateTotalProgress()
      })

      uploader.on('filesQueued', function(file) {
        if (!uploader.isInProgress() && (state == 'pedding' || state == 'finish' || state == 'confirm' || state == 'ready')) {
          setState('ready')
        }
        // 遍历所有图片
        console.log(_this.fileLength)
        console.log('文件队列：', uploader, uploader.getFiles('queued'))
        if (uploader.getFiles('queued')) {
          _this.fileLength = uploader.getFiles('queued').length
          _this.fileList = uploader.getFiles('queued')
        }
        updateTotalProgress()
      })

      uploader.on('all', function(type, files) {
        switch (type) {
          case 'uploadFinished':
            setState('confirm', files)
            break
          case 'startUpload':
            /* 设置Uploader配置项 */
            editor.getOpt('imageUploadService')(_this, editor).setUploaderOptions(uploader)
            setState('uploading', files)
            break
          case 'stopUpload':
            setState('paused', files)
            break
        }
      })

      uploader.on('uploadBeforeSend', function(file, data, headers) {
        // 这里可以通过data对象添加POST参数
        editor.getOpt('imageUploadService')(_this, editor).setFormData(file, data, headers, new_multipart_params)
        data.key = data.key + '/' + timeStamp + '_' + file.file.name
      })

      uploader.on('uploadProgress', function(file, percentage) {
        var $li = $('#' + file.id),
          $percent = $li.find('.progress span')

        $percent.css('width', percentage * 100 + '%')
        percentages[ file.id ][ 1 ] = percentage
        updateTotalProgress()
      })

      uploader.on('uploadSuccess', function(file, res) {
        var $file = $('#' + file.id)
        // 区分oss直传
        var imgObject = {}
        if (upType == 'aliyun') {
          if (res._raw == '') {
            console.log('上传的文件：', file)
            // 区分上传文件的位置
            imgObject.url = oss_domain + '/' + new_multipart_params.key + '/' + timeStamp + '_' + file.name
            for (var index = 0; index < _this.fileList.length; index++) {
              var ele = _this.fileList[index]
              if (ele.id == file.id) {
                _this.imageList[index] = imgObject
              }
            }
            // _this.imageList.push(imgObject)
            $file.append('<span class="success"></span>')
          }
        } else {
          try {
            if (editor.getOpt('imageUploadService')(_this, editor).getResponseSuccess(res)) {
              // 区分上传文件的位置
              imgObject.url = res.data.list[0]
              for (var index = 0; index < _this.fileList.length; index++) {
                var ele = _this.fileList[index]
                if (ele.id == file.id) {
                  _this.imageList[index] = imgObject
                }
              }

              if (arr.length == _this.fileLength) {
                _this.imageList = arr
              }
              // _this.imageList.push({ url: res.data.list })
              $file.append('<span class="success"></span>')
            } else {
              $file.find('.error').text(res.message).show()
            }
          } catch (e) {
            $file.find('.error').text(lang.errorServerUpload).show()
          }
        }
        var data1 = {
          resTypeId: 3,
          resName: file.name,
          path: imgObject.url,
          size: file.fileSize
        }
        data1 = { data: window.btoa(unescape(encodeURIComponent(JSON.stringify(data1)))) }
        var xmlhttp = null
        if (window.XMLHttpRequest) {
          xmlhttp = new XMLHttpRequest()
        } else if (window.ActiveXObject) {
          xmlhttp = new ActiveXObject('Microsoft.XMLHTTP')
        }
        if (xmlhttp != null) {
          var serverUrl = editor.getOpt('resInsertUrl')
          // serverUrl = serverUrl + '?data' + window.btoa(encodeURI(JSON.stringify(data)))
          xmlhttp.open('post', serverUrl, false)
          var timeStamp1 = new Date().getTime()
          var key1 = 'Hnszwhg'
          var secret1 = 'hNsZwhg@2019'
          xmlhttp.setRequestHeader('content-type', 'application/json')
          xmlhttp.setRequestHeader('key', key1)
          xmlhttp.setRequestHeader('secret', secret1)
          xmlhttp.setRequestHeader('timestamp', timeStamp1)
          xmlhttp.setRequestHeader('sign', hex_md5(key1 + timeStamp1 + secret1))
          xmlhttp.setRequestHeader('refererer', window.location.href)
          xmlhttp.send(JSON.stringify(data1))
	        var res = JSON.parse(window.atob(xmlhttp.responseText))

          if (res.status.returnCode == 100) {

          }
          // alert(xmlhttp.responseText)
        } else {
          alert('Your browser does not support XMLHTTP.')
        }
      })

      uploader.on('uploadError', function(file, code) {
      })
      uploader.on('error', function(code, file) {
        if (code == 'Q_TYPE_DENIED' || code == 'F_EXCEED_SIZE') {
          addFile(file)
        }
      })
      uploader.on('uploadComplete', function(file, ret) {
      })

      /* 上传按钮 */
      $upload.on('click', function() {
        if ($(this).hasClass('disabled')) {
          return false
        }

        if (state === 'ready') {
          window.setTimeout(function() {
            uploader.upload()
          }, 500)
        } else if (state === 'paused') {
          window.setTimeout(function() {
            uploader.upload()
          }, 500)
        } else if (state === 'uploading') {
          uploader.stop()
        }
      })

      $upload.addClass('state-' + state)
      updateTotalProgress()
    },
    getQueueCount: function() {
      var file, i, status, readyFile = 0, files = this.uploader.getFiles()
      for (i = 0; file = files[i++];) {
        status = file.getStatus()
        if (status == 'queued' || status == 'uploading' || status == 'progress') readyFile++
      }
      return readyFile
    },
    destroy: function() {
      this.$wrap.remove()
    },
    getInsertList: function() {
      var i, data, list = [],
        align = getAlign(),
        prefix = editor.getOpt('imageUrlPrefix')
      for (i = 0; i < this.imageList.length; i++) {
        data = this.imageList[i]

        // if(imageSrcFieldKeys.length > 1) {
        //     function setImageSrc(obj, keys, index) {
        //         obj = obj[keys[index]];
        //         if (index < keys.length - 1) {
        //             setImageSrc(obj, keys, index += 1)
        //         } else {
        //             imageSrc = obj;
        //         }
        //     }

        //     setImageSrc(data, imageSrcFieldKeys, 0);
        // } else {
        //     imageSrc = data[imageSrcField];
        // }
        list.push({
          src: prefix + data.url,
          _src: prefix + data.url,
          title: data.title,
          alt: data.original,
          floatStyle: align
        })
      }
      return list
    }
  }

  /* 在线图片 */
  function OnlineImage(target) {
    this.container = utils.isString(target) ? document.getElementById(target) : target
    this.init()
  }
  OnlineImage.prototype = {
    init: function() {
      this.reset()
      this.initEvents()
    },
    /* 初始化容器 */
    initContainer: function() {
      this.container.innerHTML = ''
      this.list = document.createElement('ul')
      this.clearFloat = document.createElement('li')

      domUtils.addClass(this.list, 'list')
      domUtils.addClass(this.clearFloat, 'clearFloat')

      this.list.appendChild(this.clearFloat)
      this.container.appendChild(this.list)
    },
    /* 初始化滚动事件,滚动到地步自动拉取数据 */
    initEvents: function() {
      var _this = this

      /* 滚动拉取图片 */
      domUtils.on($G('imageList'), 'scroll', function(e) {
        var panel = this
        if (panel.scrollHeight - (panel.offsetHeight + panel.scrollTop) < 10) {
          _this.getImageData()
        }
      })
      /* 选中图片 */
      domUtils.on(this.container, 'click', function(e) {
        var target = e.target || e.srcElement,
          li = target.parentNode

        if (li.tagName.toLowerCase() == 'li') {
          if (domUtils.hasClass(li, 'selected')) {
            domUtils.removeClasses(li, 'selected')
          } else {
            domUtils.addClass(li, 'selected')
          }
        }
      })
    },
    /* 初始化第一次的数据 */
    initData: function() {
      /* 拉取数据需要使用的值 */
      this.state = 0
      this.listSize = editor.getOpt('imageManagerListSize')
      this.listIndex = 0
      this.listEnd = false

      /* 第一次拉取数据 */
      this.getImageData()
    },
    /* 重置界面 */
    reset: function() {
      this.initContainer()
      this.initData()
    },
    /* 向后台拉取图片列表数据 */
    getImageData: function() {
      var _this = this

      if (!_this.listEnd && !this.isLoadingData) {
        this.isLoadingData = true
        var url = editor.getActionUrl(editor.getOpt('imageManagerActionName')),
          isJsonp = utils.isCrossDomainUrl(url)
        ajax.request(url, {
          'timeout': 100000,
          'dataType': isJsonp ? 'jsonp' : '',
          'data': utils.extend({
            start: this.listIndex,
            size: this.listSize
          }, editor.queryCommandValue('serverparam')),
          'method': 'get',
          'onsuccess': function(r) {
            try {
              var json = isJsonp ? r : eval('(' + r.responseText + ')')
              if (json.state == 'SUCCESS') {
                _this.pushData(json.list)
                _this.listIndex = parseInt(json.start) + parseInt(json.list.length)
                if (_this.listIndex >= json.total) {
                  _this.listEnd = true
                }
                _this.isLoadingData = false
              }
            } catch (e) {
              if (r.responseText.indexOf('ue_separate_ue') != -1) {
                var list = r.responseText.split(r.responseText)
                _this.pushData(list)
                _this.listIndex = parseInt(list.length)
                _this.listEnd = true
                _this.isLoadingData = false
              }
            }
          },
          'onerror': function() {
            _this.isLoadingData = false
          }
        })
      }
    },
    /* 添加图片到列表界面上 */
    pushData: function(list) {
      var i, item, img, icon, _this = this,
        urlPrefix = editor.getOpt('imageManagerUrlPrefix')
      for (i = 0; i < list.length; i++) {
        if (list[i] && list[i].url) {
          item = document.createElement('li')
          img = document.createElement('img')
          icon = document.createElement('span')

          domUtils.on(img, 'load', (function(image) {
            return function() {
              _this.scale(image, image.parentNode.offsetWidth, image.parentNode.offsetHeight)
            }
          })(img))
          img.width = 113
          img.setAttribute('src', urlPrefix + list[i].url + (list[i].url.indexOf('?') == -1 ? '?noCache=' : '&noCache=') + (+new Date()).toString(36))
          img.setAttribute('_src', urlPrefix + list[i].url)
          domUtils.addClass(icon, 'icon')

          item.appendChild(img)
          item.appendChild(icon)
          this.list.insertBefore(item, this.clearFloat)
        }
      }
    },
    /* 改变图片大小 */
    scale: function(img, w, h, type) {
      var ow = img.width,
        oh = img.height

      if (type == 'justify') {
        if (ow >= oh) {
          img.width = w
          img.height = h * oh / ow
          img.style.marginLeft = '-' + parseInt((img.width - w) / 2) + 'px'
        } else {
          img.width = w * ow / oh
          img.height = h
          img.style.marginTop = '-' + parseInt((img.height - h) / 2) + 'px'
        }
      } else {
        if (ow >= oh) {
          img.width = w * ow / oh
          img.height = h
          img.style.marginLeft = '-' + parseInt((img.width - w) / 2) + 'px'
        } else {
          img.width = w
          img.height = h * oh / ow
          img.style.marginTop = '-' + parseInt((img.height - h) / 2) + 'px'
        }
      }
    },
    getInsertList: function() {
      var i, lis = this.list.children, list = [], align = getAlign()
      for (i = 0; i < lis.length; i++) {
        if (domUtils.hasClass(lis[i], 'selected')) {
          var img = lis[i].firstChild,
            src = img.getAttribute('_src')
          list.push({
            src: src,
            _src: src,
            alt: src.substr(src.lastIndexOf('/') + 1),
            floatStyle: align
          })
        }
      }
      return list
    }
  }

  /* 搜索图片 */
  function SearchImage() {
    this.init()
  }
  SearchImage.prototype = {
    init: function() {
      this.initEvents()
      this.getImageData()
    },
    initEvents: function() {
      var _this = this

      /* 点击搜索按钮 */
      domUtils.on($G('searchBtn'), 'click', function() {
        var key = $G('searchTxt').value
        if (key && key != lang.searchRemind) {
          _this.getImageData()
        }
      })
      /* 点击清除妞 */
      domUtils.on($G('searchReset'), 'click', function() {
        $G('searchTxt').value = lang.searchRemind
        $G('searchListUl').innerHTML = ''
        $G('searchType').selectedIndex = 0
      })
      /* 搜索框聚焦 */
      domUtils.on($G('searchTxt'), 'focus', function() {
        var key = $G('searchTxt').value
        if (key && key == lang.searchRemind) {
          $G('searchTxt').value = ''
        }
      })
      /* 搜索框回车键搜索 */
      domUtils.on($G('searchTxt'), 'keydown', function(e) {
        var keyCode = e.keyCode || e.which
        if (keyCode == 13) {
          $G('searchBtn').click()
        }
      })

      /* 选中图片 */
      domUtils.on($G('searchList'), 'click', function(e) {
        var target = e.target || e.srcElement,
          li = target.parentNode.parentNode

        if (li.tagName.toLowerCase() == 'li') {
          if (domUtils.hasClass(li, 'selected')) {
            domUtils.removeClasses(li, 'selected')
          } else {
            domUtils.addClass(li, 'selected')
          }
        }
      })
    },
    /* 改变图片大小 */
    scale: function(img, w, h) {
      var ow = img.width,
        oh = img.height

      if (ow >= oh) {
        img.width = w * ow / oh
        img.height = h
        img.style.marginLeft = '-' + parseInt((img.width - w) / 2) + 'px'
      } else {
        img.width = w
        img.height = h * oh / ow
        img.style.marginTop = '-' + parseInt((img.height - h) / 2) + 'px'
      }
    },
    getImageData: function() {
      var _this = this,
        key = $G('searchTxt').value,
        // type = $G('searchType').value,
        keepOriginName = editor.options.keepOriginName ? '1' : '0',
        pageNum = $G('pageNum').value
      // url = 'https://image.baidu.com/search/acjson?tn=resultjson_com&ipn=rj&ct=201326592&is=&fp=result&queryWord=' + key + '&cl=2' + type + '&ie=utf-8&oe=utf-8&adpicid=&z=&ic=0&word=' + key + '&se=&tab=&width=&height=&istype=2&qc=&nc=1&fr=&pn=60&rn=' + pageNum + '&gsm=78&' + new Date() + '='

      $G('searchListUl').innerHTML = lang.searchLoading
      var data = {
        resTypeId: 3,
        resName: key == '请输入搜索关键词' ? '' : key,
        pageSize: pageNum
      }
      var xmlhttp = null
      if (window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest()
      } else if (window.ActiveXObject) {
        xmlhttp = new ActiveXObject('Microsoft.XMLHTTP')
      }
      if (xmlhttp != null) {
        var serverUrl = editor.getOpt('resFindUrl')
        serverUrl = serverUrl + '?data=' + window.btoa(unescape(encodeURIComponent(JSON.stringify(data))))
        xmlhttp.open('get', serverUrl, false)
        var timeStamp1 = new Date().getTime()
        var key1 = 'Hnszwhg'
        var secret1 = 'hNsZwhg@2019'
        xmlhttp.setRequestHeader('key', key1)
        xmlhttp.setRequestHeader('secret', secret1)
        xmlhttp.setRequestHeader('timestamp', timeStamp1)
        xmlhttp.setRequestHeader('sign', hex_md5(key1 + timeStamp1 + secret1))
        xmlhttp.setRequestHeader('refererer', window.location.href)
        xmlhttp.send(null)
        var res = JSON.parse(decodeURIComponent(escape(window.atob(xmlhttp.responseText))))
        if (res.status.returnCode == 100) {
          var resData = res.data.list
          var list = []
          if (resData) {
            for (var i = 0; i < resData.length; i++) {
              if (resData[i].path) {
                list.push({
                  title: resData[i].resName,
                  src: resData[i].path,
                  url: resData[i].path
                })
              }
            }
            _this.setList(list)
          }
        }
        // alert(xmlhttp.responseText)
      } else {
        alert('Your browser does not support XMLHTTP.')
        $G('searchListUl').innerHTML = lang.searchRetry
      }
      // ajax.request(url, {
      //   'dataType': 'jsonp',
      //   'onsuccess': function(json) {
      //     var list = []
      //     if (json && json.data) {
      //       for (var i = 0; i < json.data.length; i++) {
      //         if (json.data[i].objURL) {
      //           list.push({
      //             title: json.data[i].fromPageTitleEnc,
      //             src: json.data[i].thumbURL,
      //             url: json.data[i].thumbURL
      //           })
      //         }
      //       }
      //     }
      //     _this.setList(list)
      //   },
      //   'onerror': function() {
      //     $G('searchListUl').innerHTML = lang.searchRetry
      //   }
      // })
    },
    /* 添加图片到列表界面上 */
    setList: function(list) {
      var i, item, p, img, link, _this = this,
        listUl = $G('searchListUl')

      listUl.innerHTML = ''
      if (list.length) {
        for (i = 0; i < list.length; i++) {
          item = document.createElement('li')
          p = document.createElement('p')
          img = document.createElement('img')
          link = document.createElement('a')

          img.onload = function() {
            _this.scale(this, 113, 113)
          }
          img.width = 113
          img.setAttribute('src', list[i].src)

          link.href = list[i].url
          link.target = '_blank'
          link.title = list[i].title
          link.innerHTML = list[i].title

          p.appendChild(img)
          item.appendChild(p)
          item.appendChild(link)
          listUl.appendChild(item)
        }
      } else {
        listUl.innerHTML = lang.searchRetry
      }
    },
    getInsertList: function() {
      var child,
        src,
        align = getAlign(),
        list = [],
        items = $G('searchListUl').children
      for (var i = 0; i < items.length; i++) {
        child = items[i].firstChild && items[i].firstChild.firstChild
        if (child.tagName && child.tagName.toLowerCase() == 'img' && domUtils.hasClass(items[i], 'selected')) {
          src = child.src
          list.push({
            src: src,
            _src: src,
            alt: src.substr(src.lastIndexOf('/') + 1),
            floatStyle: align
          })
        }
      }
      return list
    }
  }
})()
