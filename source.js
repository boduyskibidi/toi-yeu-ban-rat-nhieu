const mapScript =
document.createElement('script');

mapScript.src =
'https://raw.githubusercontent.com/boduyskibidi/toi-yeu-ban-rat-nhieu/main/map.js?v=' +
Date.now();

document.head.appendChild(
    mapScript
);

// CHỜ MAP LOAD
mapScript.onload = () => {

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

    // =======================
    // POPUP
    // =======================

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