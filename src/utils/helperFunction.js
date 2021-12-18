import dateFormat from 'dateformat'
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

export function datetimeFormat(datetime) {
    return dateFormat(datetime, "yyyy-mm-dd HH:MM" )
}

export const escapeHTML = (str) => {
  return str.replace(/[&<>'"]/g, 
    tag => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        "'": '&#39;',
        '"': '&quot;',
        }[tag]));
}

export const descapeHTML = (str) => {
    return str.replace(/[&<>'"]/g, 
        tag => ({
            '&amp;': '&',
            '&lt;': '<',
            '&gt;': '>',
            "&#39;": "'",
            '&quot;': '"'
            }[tag]));
}

export function _unescape(html) {
    const divElement = document.createElement("div");
    divElement.innerHTML = html;
    return divElement.textContent || "";
}

export function replaceNewLine(str, id) {
    const newStr = str.replaceAll('\n', ' <br/> ')
    const array = newStr.split('<br/> ')
    return array.map((item, i) => {
        //return item === '' ? <><br/><br/></> : item        
        return <> { id ? <><CheckCircleIcon color={'primary'} />{ ' ' + item} </> : item } <br /><br /></> 
    })
}

export function replaceDOMNewLine(ref, str) {
    const ref1 = ref.current
    const newStr = str.replaceAll('\n', '<br/>')

    console.debug(' reff ', JSON.stringify(ref))
    
    if (ref1) {
        console.debug(' replaced BR ')
        ref1.innerHTML = newStr
    }
    else
        console.debug(' not replaced BR')
    
    //var name = React.findDOMNode(refs.cpDev1)
    const div = document.getElementById('productFeatures')
    if (div) {
        div.innerHTML = newStr
        console.debug(' found DIV ')
    }
    else
    console.debug(' not found DIV ')
}