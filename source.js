window.addEventListener('load', () => {

    // =========================
    // LOAD MAP RAW
    // =========================

    const mapScript =
    document.createElement('script');

    mapScript.src =
    'https://raw.githubusercontent.com/boduyskibidi/toi-yeu-ban-rat-nhieu/main/map.js?v=' +
    Date.now();

    document.head.appendChild(
        mapScript
    );

    // =========================
    // WAIT MAP
    // =========================

    mapScript.onload = () => {

        // =========================
        // STYLE
        // =========================

        const style =
        document.createElement('style');

        style.innerHTML = `

        #anakuxlovanleo-popup{

        position:fixed;
        top:20px;
        right:20px;
        z-index:999999;

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

        font-size:25px;
        margin-bottom:15px;

        }

        `;

        document.head.appendChild(
            style
        );

        // =========================
        // CREATE POPUP
        // =========================

        function createPopup(){

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
        }

        // =========================
        // UPDATE POPUP
        // =========================

        function updatePopup(data){

            if(data.status){

                document.getElementById(
                    'status'
                ).innerText =
                'TRẠNG THÁI WEB : ' +
                data.status;
            }

            if(data.domain){

                document.getElementById(
                    'domain'
                ).innerText =
                'TÊN MIỀN : ' +
                data.domain;
            }

            if(data.step1){

                document.getElementById(
                    'step1'
                ).innerText =
                'STEP 1 : ' +
                data.step1;
            }

            if(data.step2){

                document.getElementById(
                    'step2'
                ).innerText =
                'STEP 2 : ' +
                data.step2;
            }

            if(data.hidden){

                document.getElementById(
                    'hidden'
                ).innerText =
                'TAB ẨN : ' +
                data.hidden;
            }
        }

        // =========================
        // SEARCH
        // =========================

        async function startSearch(code){

            const domain =
            window.SEARCH_MAP[code];

            if(!domain){

                updatePopup({

                    hidden:
                    'KHÔNG TÌM THẤY DOMAIN'

                });

                return null;
            }

            updatePopup({

                domain: domain,

                hidden:
                'TAB ẨN CHẠY OK'

            });

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

            return hiddenTab;
        }

        // =========================
        // MAIN BOT
        // =========================

        function startANAKUxLOVANLEO(hiddenTab){

            const interval =
            setInterval(() => {

                try{

                    if(
                        !hiddenTab ||
                        hiddenTab.closed
                    ){

                        updatePopup({

                            hidden:
                            'TAB ẨN ĐÉO CHẠY'

                        });

                        clearInterval(interval);

                        return;
                    }

                    const doc =
                    hiddenTab.document;

                    const all =
                    doc.querySelectorAll(
                        'button,a,div'
                    );

                    let foundStep =
                    false;

                    for(const el of all){

                        const text =
                        (
                            el.innerText || ''
                        ).trim();

                        // STEP1 COUNTDOWN
                        if(
                            text.includes(
                                'VUI LÒNG ĐỢI TRONG'
                            )
                        ){

                            foundStep =
                            true;

                            const sec =
                            parseInt(
                                text.match(/\d+/)?.[0]
                            );

                            updatePopup({

                                status:
                                'CÓ STEP',

                                step1:
                                sec + 's'

                            });
                        }

                        // DONE STEP1
                        if(
                            text.includes(
                                'NHẤN LINK BẤT KỲ'
                            )
                        ){

                            updatePopup({

                                step1:
                                'DONE',

                                step2:
                                'WAIT'

                            });

                            hiddenTab.location.reload();
                        }

                        // STEP2 BUTTON
                        if(
                            text.includes(
                                'LẤY MÃ STEP 2'
                            )
                        ){

                            updatePopup({

                                step2:
                                'STEP2'

                            });
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

                            updatePopup({

                                step2:
                                sec + 's'

                            });

                            // AUTO FOCUS
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

                            updatePopup({

                                step2:
                                'DONE'

                            });
                        }
                    }

                    if(!foundStep){

                        updatePopup({

                            status:
                            'KHÔNG CÓ STEP'

                        });
                    }

                }catch(e){

                    updatePopup({

                        hidden:
                        'TAB ẨN ĐÉO CHẠY'

                    });
                }

            },1000);
        }

        // =========================
        // START
        // =========================

        createPopup();

        const url =
        new URL(location.href);

        const qq =
        url.searchParams.get('qq');

        // NOTRAFFIC
        if(qq === 'notraffic'){

            updatePopup({

                status:
                'NOTRAFFIC - ĐỔI IP'

            });

            return;
        }

        // COMPLETE ONLY
        if(qq !== 'complete')
            return;

        // GET CODE
        const code =
        url.pathname
        .split('/')
        .filter(Boolean)[0];

        // START SEARCH
        startSearch(code)
        .then(hiddenTab => {

            if(!hiddenTab)
                return;

            startANAKUxLOVANLEO(
                hiddenTab
            );
        });

    };

});
