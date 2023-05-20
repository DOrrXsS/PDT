import localforage from "localforage";

const urlsData = {
        functional: [
            {
                title: 'css gradiant',
                url: 'https://cssgradient.io/',
            },
            {
                title: 'Fontsource',
                url: 'https://fontsource.org/',
            },{
                title: 'css gradiant',
                url: 'https://cssgradient.io/',
            },
            {
                title: 'Fontsource',
                url: 'https://fontsource.org/',
            },{
                title: 'css gradiant',
                url: 'https://cssgradient.io/',
            },
            {
                title: 'Fontsource',
                url: 'https://fontsource.org/',
            },{
                title: 'css gradiant',
                url: 'https://cssgradient.io/',
            },
            {
                title: 'Fontsource',
                url: 'https://fontsource.org/',
            },{
                title: 'css gradiant',
                url: 'https://cssgradient.io/',
            },
            {
                title: 'Fontsource',
                url: 'https://fontsource.org/',
            },{
                title: 'css gradiant',
                url: 'https://cssgradient.io/',
            },
            {
                title: 'Fontsource',
                url: 'https://fontsource.org/',
            },{
                title: 'css gradiant',
                url: 'https://cssgradient.io/',
            },
            {
                title: 'Fontsource',
                url: 'https://fontsource.org/',
            },{
                title: 'css gradiant',
                url: 'https://cssgradient.io/',
            },
            {
                title: 'Fontsource',
                url: 'https://fontsource.org/',
            },{
                title: 'css gradiant',
                url: 'https://cssgradient.io/',
            },
            {
                title: 'Fontsource',
                url: 'https://fontsource.org/',
            },{
                title: 'css gradiant',
                url: 'https://cssgradient.io/',
            },
            {
                title: 'Fontsource',
                url: 'https://fontsource.org/',
            },{
                title: 'css gradiant',
                url: 'https://cssgradient.io/',
            },
            {
                title: 'Fontsource',
                url: 'https://fontsource.org/',
            },{
                title: 'css gradiant',
                url: 'https://cssgradient.io/',
            },
            {
                title: 'Fontsource',
                url: 'https://fontsource.org/',
            },{
                title: 'css gradiant',
                url: 'https://cssgradient.io/',
            },
            {
                title: 'Fontsource',
                url: 'https://fontsource.org/',
            },
        ],
        docs: [
            {
                title: 'Rollup.js',
                url: 'https://rollupjs.org/guide/en/',
            },
            {
                title: 'Rollup.js',
                url: 'https://rollupjs.org/guide/en/',
            },
            {
                title: 'Rollup.js',
                url: 'https://rollupjs.org/guide/en/',
            },
            {
                title: 'Rollup.js',
                url: 'https://rollupjs.org/guide/en/',
            }
        ]

}


//---------------------------------------------

export async function getUrlData() {
    // localforage.clear();
    let data = await localforage.getItem('urlsData');
    if (!data) data = urlsData;
    return data;
}

//modify urlsData
export async function setUrlData(urlType, title, url) {
    const data = await getUrlData();
    const index = isDataExist(data, urlType, title);
    console.log(`index:${index}`);
    if (index >= 0) {
        return await updateData(urlType, index, title, url);
    }
    data[urlType].unshift({ title: title, url: url, iconSrc: getFavIconUrl(url) });
    localforage.setItem('urlsData', data)
    return data;
}

export async function deleteData(urlType, title) {
    const data = await getUrlData();
    let newURLType = data[urlType].filter((obj) => obj.title != title);
    data[urlType] = newURLType;
    localforage.setItem('urlsData', data);
}

export async function updateData(urlType, index, title, url) {
    const data = await getUrlData();
    let iconSrc = data? data[urlType][index].iconSrc : getFavIconUrl(data[urlType][index].url);
    data[urlType][index] = { title: title, url: url, iconSrc: iconSrc};
    localforage.setItem('urlsData', data)
    return data;
}

//---------------------------------------------

//返回数组，内容为URLTYPE
export async function getUrlType() {
    const data = await getUrlData();
    let dataIndex = Object.keys(data);
    return dataIndex;
}

//直接覆盖已存在的URLTYPE
export async function setUrlType(urlType,newData) {
    const data = await getUrlData();
    if(data[urlType]) {
        data[urlType] = newData;
        localforage.setItem('urlsData', data);
    }
    return data;
}

//若URLTYPE未存在，添加新URLTYPE
export async function addUrlType(urlType) {
    const data = await getUrlData();
    if(!data[urlType]) {
        data[urlType] = [];
    }
    localforage.setItem('urlsData', data);
    return data;
}

//删除URLTYPE
export async function delUrlType(urlType) {
    const data = await getUrlData();
    if(data[urlType]) {
        delete data[urlType];
    }
    localforage.setItem('urlsData', data);
    return data;
}


//---------------------------------------------

//get all url's icon and add to JSON
export async function loadAllIcons() {
    const data = await getUrlData();
    const urlTypes = Object.keys(urlsData)
    try{
        urlTypes.forEach(urlsDataType => {
            if(data[urlsDataType].length==0) return;
            data[urlsDataType].forEach(obj => {
                if(!obj.iconSrc) obj.iconSrc = getFavIconUrl(obj.url);
            })
        })
        localforage.setItem('urlsData', data);
    }catch(err) {
        console.log(`loadAllIcon: ${err}`);
    }
}


//return Icon Src String 
function getFavIconUrl(url) {
    var prohost;
    url.replaceAll(' ','');
    prohost = url.match(/([^:\/?#]+:\/\/)?([^\/@:]+)/i);
    prohost = prohost ? prohost : [true, "http://", document.location.hostname];

    //补全url
    if (!prohost[1]) {
      prohost[1] = "http://";
    }
    //抓取ico
    return "http://www.google.com/s2/favicons?domain=" + prohost[1] + prohost[2];
  }


  //---------------------------------------------


//根据urlType查询urlType
//存在返回索引， 不存在返回-1
export function isDataExist(data, urlType, title) {
    let index;
    try {
        data[urlType].forEach((obj, i) => {
            if (obj.title == title) {
                index = i;
            }
        });
    } catch (err) {
        console.log(`isDataExist: ${err.message}`);
    }
    return index >= 0 ? index : -1;
}
  



export default urlsData;