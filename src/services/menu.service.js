import { getContent } from 'api/apiService';

let loading = false

const load = async () => {
    let menuData = {}
    console.debug('menuData hevlegdlee')
    try {
        loading = true
        let res = await getContent('channels?_sort=Sequence:asc');
        console.debug(' channels ' + JSON.stringify(res.length))
        if (res.length > 0)
            menuData['channels'] = res
        
        res = await getContent('industries?_sort=Sequence:asc');
        console.debug(' industries ' + JSON.stringify(res.length))

        if (res.length > 0)
            menuData['industries'] = res

        res = await getContent('functions?_sort=Sequence:asc');
        console.debug(' functions ' + JSON.stringify(res.length))

        if (res.length > 0)
            menuData['functions'] = res

        res = await getContent('teches?_sort=sec:asc');
        console.debug(' teches ' + JSON.stringify(res.length))

        if (res.length > 0)
            menuData['teches'] = res
        
        res = await getContent('markets');
        console.debug(' markets ' + JSON.stringify(res.length))

        if (res.length > 0)
            menuData['markets'] = res

        res = await getContent('segments');
        console.debug(' segments ' + JSON.stringify(res.length))

        if (res.length > 0)
            menuData['segments'] = res
        
        res = await getContent('languages');
        console.debug(' languages ' + JSON.stringify(res.length))

        if (res.length > 0)
            menuData['languages'] = res

        res = await getContent('service-types?_sort=sequence:asc&homepage=true');
        console.debug(' service-types ' + JSON.stringify(res.length))
        if (res.length > 0)
            menuData['serviceType'] = res
        
        res = await getContent('product-types?homepage=true');
        console.debug(' product-types ' + JSON.stringify(res.length))
        if (res.length > 0)
            menuData['productTypes'] = res

        res = await getContent('directions?_sort=sequence:asc');
        console.debug(' directions ' + JSON.stringify(res.length))
        if (res.length > 0)
            menuData['directions'] = res

        res = await getContent('article-types?homepage=true');
        console.debug(' article-types ' + JSON.stringify(res.length))
        if (res.length > 0)
            menuData['articleTypes'] = res
        
        res = await getContent('points');
        console.debug(' points ' + JSON.stringify(res.length))
        if (res.length > 0)
            menuData['points'] = res

        res = await getContent('abouts');
        console.debug(' abouts ' + JSON.stringify(res.length))
        if (res.length > 0)
            menuData['abouts'] = res
        
        res = await getContent('reviews');
        console.debug(' reviews ' + JSON.stringify(res.length))
        if (res.length > 0)
            menuData['reviews'] = res
        
        res = await getContent('num-products');
        console.debug(' numProducts ' + JSON.stringify(res.length))
        if (res.length > 0)
            menuData['numProducts'] = res
        
        res = await getContent('articles');
        console.debug(' articles ' + JSON.stringify(res.length))
        if (res.length > 0)
            menuData['articles'] = res
        
        res = await getContent('footertypes?_sort=Sequence:asc');
        console.debug(' footertypes ' + JSON.stringify(res.length))
        if (res.length > 0)
            menuData['footerTypes'] = res
        
        res = await getContent('footermenus?_sort=Sequence:asc');
        console.debug(' footermenus ' + JSON.stringify(res.length))
        if (res.length > 0)
            menuData['footerMenus'] = res
    }
    catch(e) {
        loading = false
        console.debug(' menuData service error: ' + JSON.stringify(e))
    }
    finally {
        localStorage.setItem("menuData", JSON.stringify(menuData))
        loading = false
        return menuData
    }
}

export default { load, loading };