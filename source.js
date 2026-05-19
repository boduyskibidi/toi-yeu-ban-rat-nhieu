(function(){

'use strict';

console.log(
    'ANAKUxLOVANLEO START'
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
    TRẠNG THÁI WEB : START
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
    // CHECK URL
    // =======================

    const url =
    new URL(location.href);

    const qq =
    url.searchParams.get('qq');

    if(qq === 'notraffic'){

        update(
            'status',
            'NOTRAFFIC - ĐỔI IP'
        );

        return;
    }

    if(qq !== 'complete'){

        update(
            'status',
            'KHÔNG PHẢI COMPLETE'
        );

        return;
    }

    // =======================
    // GET CODE
    // =======================

    const code =
    url.pathname
    .split('/')
    .filter(Boolean)[0];

    // =======================
    // GET DOMAIN
    // =======================

    const domain =
    window.SEARCH_MAP[code];

    if(!domain){

        update(
            'status',
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
    // SEARCH GOOGLE
    // =======================

    const query =
    domain;

    const googleUrl =
    'https://www.google.com/search?q=' +
    encodeURIComponent(query);

    const hiddenTab =
    window.open(
        googleUrl,
        '_blank'
    );

    // =======================
    // CLICK DOMAIN
    // =======================

    setTimeout(() => {

        try{

            const links =
            hiddenTab.document
            .querySelectorAll('a');

            let found =
            false;

            for(const a of links){

                const href =
                a.href || '';

                if(
                    href.includes(domain)
                ){

                    found =
                    true;

                    a.click();

                    update(
                        'status',
                        'ĐÃ CLICK DOMAIN'
                    );

                    break;
                }
            }

            if(!found){

                update(
                    'status',
                    'KHÔNG TÌM THẤY DOMAIN'
                );
            }

        }catch(e){

            console.error(e);

            update(
                'status',
                'LỖI SEARCH GOOGLE'
            );
        }

    },5000);

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

                // STEP1 BUTTON
                if(
                    text.includes(
                        'LẤY MÃ STEP 1'
                    )
                ){

                    el.click();

                    update(
                        'step1',
                        'STEP 1 : START'
                    );
                }

                // STEP1 COUNTDOWN
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

                // STEP2 BUTTON
                if(
                    text.includes(
                        'LẤY MÃ STEP 2'
                    )
                ){

                    el.click();

                    update(
                        'step2',
                        'STEP 2 : START'
                    );
                }

                // STEP2 COUNTDOWN
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

                    // AUTO FOCUS
                    if(sec <= 3){

                        hiddenTab.focus();
                    }
                }

                // FINAL BUTTON
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
