/* global KEEP */

function initCopyrightInfoHelper() {
  KEEP.utils.copyrightInfoHelper = {
    // set post link
    initSetPostLink() {
      const postLinkContentDom = document.querySelector(
        '.copyright-info-content .copyright-post-link'
      )
      postLinkContentDom && (postLinkContentDom.innerHTML = decodeURI(window.location.href))
    },

    // copy copyright info
    copyCopyrightInfo() {
      const cicDom = document.querySelector('.copyright-info-content')

      if (!cicDom) {
        return
      }

      const copyDom = document.querySelector('.copy-copyright-info')
      const copyIcon = copyDom.querySelector('i')

      const ccLang = KEEP.language_copy_copyright
      const colon = KEEP.hexo_config?.language === 'en' ? ': ' : '：'

      let isCopied = false

      const setCopyDomContent = (class1, class2, content, copied) => {
        if (copyIcon) {
          copyIcon.classList.remove(class1)
          copyIcon.classList.add(class2)
        }
        const tooltipDom = copyDom.querySelector('.tooltip-content')
        tooltipDom && (tooltipDom.innerHTML = content)
        isCopied = copied
      }

      copyDom.addEventListener('click', () => {
        if (!isCopied) {
          const author = cicDom.querySelector('.copyright-post-author .content').innerHTML
          const link = cicDom.querySelector('.copyright-post-link').innerHTML
          let license = `本文为作者 ${author} 原创，依据 CC BY-NC-SA 4.0 许可证进行授权，转载请附上出处链接及本声明。商业转载请联系作者获得授权，非商业转载请注明出处。`
          // const tgtTxt = `${ccLang.author}${colon}${author}\n${ccLang.link}${colon}${link}`
          const tgtTxt = `${ccLang.author}${colon}${author}\n${ccLang.link}${colon}${link}\n${license}`
          navigator.clipboard.writeText(tgtTxt).then(() => {
            setCopyDomContent('fa-copy', 'fa-check', ccLang.copied, true)
          })
        }
      })

      copyDom.addEventListener('mouseleave', () => {
        setTimeout(() => {
          setCopyDomContent('fa-check', 'fa-copy', ccLang.copy, false)
        }, 500)
      })
    }
  }

  if (KEEP.theme_config.post?.copyright_info === true) {
    KEEP.utils.copyrightInfoHelper.initSetPostLink()
    KEEP.utils.copyrightInfoHelper.copyCopyrightInfo()
  }
}

if (KEEP.theme_config.pjax?.enable === true && KEEP.utils) {
  initCopyrightInfoHelper()
} else {
  window.addEventListener('DOMContentLoaded', initCopyrightInfoHelper)
}
