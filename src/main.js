const $siteList = $('.siteList')
const $lastList = $siteList.find('li.last')
const siteListStorage = JSON.parse(localStorage.getItem('siteListStorage'))
console.log(siteListStorage)
const hashMap = siteListStorage || [
    {logo: '语', url: 'https://www.yuque.com/yikezaozi?tab=books'},
    {logo: 'G', url:'https://github.com/ml1234256/nav-web'}

]

const simplifyUrl = (url) => {
    return url.replace('https://', '')
        .replace('http://', '')
        .replace('www.', '')
        .replace(/\/.*/, '')
}

const render = () => {
    $siteList.find('li:not(.last)').remove()
    hashMap.forEach((node, index) => {
        const $li = $(`
            <li>
                <a class="site" href=${node.url}>
                    <div class="logo">${node.logo}</div>
                    <div class="url">${simplifyUrl(node.url)}</div>
                </a>
                <div class="delete">×</div>
            </li>
        `).insertBefore($lastList)

        $li.on('click', '.delete', (e) => {
            hashMap.splice(index, 1);
            render();
        })
    })
}
render()

$('.addButton').on('click', () => {
    let logo = window.prompt('名称');
    let url = window.prompt('网址');
    if(url.indexOf('http' !== 0)) {
        url = 'https://' + url;
    }
    console.log(url);
    hashMap.push({
        logo: logo[0].toUpperCase(),
        url: url
    })
    render();
})

window.onbeforeunload = () => {
    const string = JSON.stringify(hashMap);
    localStorage.setItem('siteListStorage', string)
}