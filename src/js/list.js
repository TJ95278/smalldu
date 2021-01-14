let str = '';
let bool = true;
let ids = [49];
let start = 0;
$('.list-nav ul li').click(e => {

    $('.list-nav ul li').removeClass('active');
    if ($(e.target).attr('name') === 'one') {
        ids = [49];
    } else if ($(e.target).attr('name') === 'two') {
        ids = [50];
    } else if ($(e.target).attr('name') === 'three') {
        ids = [47];
    } else if ($(e.target).attr('name') === 'four') {
        ids = [21];
    } else if ($(e.target).attr('name') === 'five') {
        ids = [34];
    }
    $(e.target).addClass('active');
    start = 0;
    str = '';
    setHtml();
})
setHtml();


window.addEventListener('scroll', () => {
    let htmlScrollTop = document.documentElement.scrollTop;

    let windowHeight = document.documentElement.clientHeight;

    let reservedHeight = 500;


    let containerHeight = $('#container').height();
    let ulHeight = $('#product-list ul').outerHeight(true);


    if (htmlScrollTop - containerHeight + windowHeight + reservedHeight > ulHeight) {
        if (!bool) return;
        bool = false;
        setHtml();
    }
})




function getTimeStamp() {
    return new Date().getTime();
}





function setHtml() {
    $('.toBot').css('display', 'none');
    //https://dumall.baidu.com/api/platform/recommender/v1?timestamp=1605680539273



    const dataObj = { mapping: "/standard", slotId: 1, ids: ids, count: 25, startIndex: start, channelId: "0", platformId: 0 };
    $.ajax({
        url: `/xdv1?timestamp=${getTimeStamp()}`,
        contentType: 'application/json;charset=UTF-8',
        type: 'post',
        data: JSON.stringify(dataObj),
        dataType: 'json',

        success: res => {
            console.log(res);
            const skuNos = [];
            let data = res.data.result;
            start += res.data.count;

            if (res.data.count === 0) {
                $('.toBot').css('display', 'block');
                return;
            }

            //存储加载商品的skuNo
            data.forEach(v => {
                skuNos.push(v.data.skuNo);
            })

            let skuStr = '';
            skuNos.forEach(v => {
                skuStr += "skuNo=" + v + '&';
            })


            $.ajax({
                url: `/xdv2?timestamp=${getTimeStamp()}&${skuStr}channelId=0&platformId=0`,
                type: 'get',
                dataType: 'json',
                success: res2 => {

                    console.log(res2)

                    let data2 = res2.data;


                    data.forEach((v, k) => {

                        str += `
                            <li class="item" >
                                <a href='./pages/detail.html?spuNo=${v.data.spuNo}'>
                                    <div class="img-container">
                                        <img src="https://product-online.cdn.bcebos.com/${v.data.pictures[0].key}" alt="">
                                    </div>
                                    <h1>${v.name}</h1>
                                    <h2>${data2[k].skuDesc}</h2>
                                    <h3>￥${data2[k].price / 100} <del>￥${data2[k].marketPrice / 100}</del></h3>
                                    <span class="satisfaction">
                                        <i class="iconfont red">&#xe688;</i>满意度100%
                                    </span>
                                    <span class="brand">
                                        ${data2[k].brandInfo ? data2[k].brandInfo.chineseName : ""}
                                    </span>
                                </a>
                            </li>
                    `;
                    })
                    $('#product-list ul').html(str);
                }
            })

            bool = true;

        }
    })

}

