(function(){

'use strict';

console.log(
    'SOURCE LOADED'
);

// =======================
// LOAD MAP
// =======================

const mapScript =
document.createElement('script');

mapScript.src =
'https://cdn.jsdelivr.net/gh/boduyskibidi/toi-yeu-ban-rat-nhieu/map.js?v=' +
Date.now();

document.head.appendChild(
    mapScript
);

// =======================
// WAIT MAP
// =======================

mapScript.onload = () => {

    console.log(
        'MAP LOADED'
    );

    // =======================
    // STYLE
    // =======================

    const style =
    document.createElement('style');

    style.innerHTML = `

    #anakuxlovanleo-popup{

    position:fixed;
    top:20px;
    right:20px;

    z-index:999999999;

    padding:20px;

    border-radius:15px;

    font-size:18px;

    font-family:monospace;

    font-weight:bold;

    color:white;

    background:
    linear-gradient(
    45deg,
    red,
    orange,
    yellow,
    lime,
    cyan,
    blue,
    violet
    );

    background-size:400% 400%;

    animation:rainbow 5s linear infinite;

    box-shadow:
    0 0 25px cyan;

    min-width:320px;

    line-height:1.8;

    }

    @keyframes rainbow{

    0%{
    background-position:0% 50%;
    }

    50%{
    background-position:100% 50%;
    }

    100%{
    background-position:0% 50%;
    }

    }

    #title{

    font-size:24px;

    margin-bottom:10px;

    }

    `;

    document.head.appendChild(
        style
    );

    // =======================
    // POPUP
    // =======================

    const popup =
    document.createElement('div');

    popup.id =
    'anakuxlovanleo-popup';

    popup.innerHTML = `

    <div id="title">
    ANAKUxLOVANLEO
    </div>

    <div id="status">
    TRẠNG THÁI WEB : WAIT
    </div>

    <div id="domain">
    TÊN MIỀN : WAIT
    </div>

    <div id="step1">
    STEP 1 : WAIT
    </div>

    <div id="step2">
    STEP 2 : WAIT
    </div>

    <div id="hidden">
    TAB ẨN : WAIT
    </div>

    `;

    document.body.appendChild(
        popup
    );

    // =======================
    // UPDATE
    // =======================

    function update(id,text){

        const el =
        document.getElementById(id);

        if(el){

            el.innerText =
            text;
        }
    }

    // =======================
    // MAIN
    // =======================

    const url =
    new URL(location.href);

    const qq =
    url.searchParams.get('qq');

    // NOTRAFFIC
    if(qq === 'notraffic'){

        update(
            'status',
            'NOTRAFFIC - ĐỔI IP'
        );

        return;
    }

    // ONLY COMPLETE
    if(qq !== 'complete'){

        update(
            'status',
            'KHÔNG PHẢI COMPLETE'
        );

        return;
    }

    // GET CODE
    const code =
    url.pathname
    .split('/')
    .filter(Boolean)[0];

    // GET DOMAIN
    const domain =
    window.SEARCH_MAP[code];

    if(!domain){

        update(
            'hidden',
            'KHÔNG TÌM THẤY DOMAIN'
        );

        return;
    }

    update(
        'domain',
        'TÊN MIỀN : ' + domain
    );

    update(
        'hidden',
        'TAB ẨN CHẠY OK'
    );

    // =======================
    // SEARCH
    // =======================

    const query =
    'site:' + domain;

    const googleUrl =
    'https://www.google.com/search?q=' +
    encodeURIComponent(query);

    const hiddenTab =
    window.open(
        googleUrl,
        '_blank',
        'width=1,height=1'
    );

    // =======================
    // LOOP
    // =======================

    setInterval(() => {

        try{

            if(
                !hiddenTab ||
                hiddenTab.closed
            ){

                update(
                    'hidden',
                    'TAB ẨN ĐÉO CHẠY'
                );

                return;
            }

            const doc =
            hiddenTab.document;

            const all =
            doc.querySelectorAll(
                'button,a,div'
            );

            for(const el of all){

                const text =
                (
                    el.innerText || ''
                ).trim();

                // STEP1
                if(
                    text.includes(
                        'VUI LÒNG ĐỢI TRONG'
                    )
                ){

                    const sec =
                    parseInt(
                        text.match(/\d+/)?.[0]
                    );

                    update(
                        'step1',
                        'STEP 1 : ' +
                        sec + 's'
                    );
                }

                // DONE STEP1
                if(
                    text.includes(
                        'NHẤN LINK BẤT KỲ'
                    )
                ){

                    update(
                        'step1',
                        'STEP 1 : DONE'
                    );

                    hiddenTab.location.reload();
                }

                // STEP2
                if(
                    text.includes(
                        'LẤY MÃ STEP 2'
                    )
                ){

                    update(
                        'step2',
                        'STEP 2 : STEP2'
                    );
                }

                // STEP2 COUNT
                if(
                    text.includes(
                        'VUI LÒNG ĐỢI TRONG'
                    )
                ){

                    const sec =
                    parseInt(
                        text.match(/\d+/)?.[0]
                    );

                    update(
                        'step2',
                        'STEP 2 : ' +
                        sec + 's'
                    );

                    if(sec <= 3){

                        hiddenTab.focus();
                    }
                }

                // FINAL
                if(
                    text.includes(
                        'NHẤN ĐỂ TIẾP TỤC'
                    )
                ){

                    el.click();

                    update(
                        'step2',
                        'STEP 2 : DONE'
                    );
                }
            }

        }catch(e){

            console.error(e);

            update(
                'hidden',
                'TAB ẨN ĐÉO CHẠY'
            );
        }

    },1000);

};

})();