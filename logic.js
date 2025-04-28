let htmlCode = '';
let cssCode = '';
let jsCode = '';

function run() {
    let htmlCode = document.getElementById("htmlCode").value;
    let cssCode = document.getElementById("cssCode").value;
    let jsCode = document.getElementById("jsCode").value;
    let output = document.getElementById("output");

    let outputDoc = output.contentWindow.document;
    outputDoc.body.innerHTML = htmlCode + "<style>" + cssCode + "</style>";

    let scriptElement = outputDoc.createElement("script");
    scriptElement.textContent = jsCode;
    outputDoc.body.appendChild(scriptElement);
}

document.getElementById("htmlCode").addEventListener("keydown", function (e) {
    if (e.key == "Tab") {
        e.preventDefault();
        var start = this.selectionStart;
        var end = this.selectionEnd;

        this.value = this.value.substring(0, start) +
            "\t" + this.value.substring(end);

        this.selectionStart =
            this.selectionEnd = start + 1;
    }
});
document.getElementById("cssCode").addEventListener("keydown", function (e) {
    if (e.key == "Tab") {
        e.preventDefault();
        var start = this.selectionStart;
        var end = this.selectionEnd;

        this.value = this.value.substring(0, start) +
            "\t" + this.value.substring(end);

        this.selectionStart =
            this.selectionEnd = start + 1;
    }
});
document.getElementById("jsCode").addEventListener("keydown", function (e) {
    if (e.key == "Tab") {
        e.preventDefault();
        var start = this.selectionStart;
        var end = this.selectionEnd;

        this.value = this.value.substring(0, start) +
            "\t" + this.value.substring(end);

        this.selectionStart =
            this.selectionEnd = start + 1;
    }
});

const closeBraces = new Map([
    ['{', '}'],
    ['[', ']'],
    ['(', ')'],
    ['<', '>'],
    ['"', '"'],
    ["'", "'"]
]);

ta = document.getElementById("htmlCode");

ta.addEventListener("input", function (e) {

    const pos = e.target.selectionStart;
    const val = [...e.target.value];

    const char = val.slice(pos - 1, pos)[0];
    const closeB = closeBraces.get(char);

    if (closeB) {
        val.splice(pos, 0, closeB);
        e.target.value = val.join('');
        e.target.selectionEnd = pos;
    }
});
ta = document.getElementById("jsCode");

ta.addEventListener("input", function (e) {

    const pos = e.target.selectionStart;
    const val = [...e.target.value];

    const char = val.slice(pos - 1, pos)[0];
    const closeB = closeBraces.get(char);

    if (closeB) {
        val.splice(pos, 0, closeB);
        e.target.value = val.join('');
        e.target.selectionEnd = pos;
    }
});

ta = document.getElementById("cssCode");

ta.addEventListener("input", function (e) {

    const pos = e.target.selectionStart;
    const val = [...e.target.value];

    const char = val.slice(pos - 1, pos)[0];
    const closeB = closeBraces.get(char);

    if (closeB) {
        val.splice(pos, 0, closeB);
        e.target.value = val.join('');
        e.target.selectionEnd = pos;
    }
});

document.getElementById("d1").onclick = function () {
    var x1 = document.createElement("a");
    x1.href = "data:text/plain;charset=UTF-8," + encodeURIComponent(document.getElementById("htmlCode").value);
    x1.setAttribute("download","index.html");
    x1.click();
}

document.getElementById("d2").onclick = function () {
    var x2 = document.createElement("a");
    x2.href = "data:text/plain;charset=UTF-8," + encodeURIComponent(document.getElementById("cssCode").value);
    x2.setAttribute("download","styles.css");
    x2.click();
}

document.getElementById("d3").onclick = function () {
    var x3 = document.createElement("a");
    x3.href = "data:text/plain;charset=UTF-8," + encodeURIComponent(document.getElementById("jsCode").value);
    x3.setAttribute("download","script.js");
    x3.click();
}


function goFullscreen(id) {
    var element = document.getElementById(id);

    if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen();

    } else if (element.webkitRequestFullScreen) {
        element.webkitRequestFullScreen();
    }
}   



window.addEventListener('beforeunload', function (event) {
    event.returnValue = 'Are you sure you want to leave? Your unsaved changes may be lost.';
});

function share() {
    const htmlCode = encodeURIComponent(document.getElementById("htmlCode").value);
    const cssCode = encodeURIComponent(document.getElementById("cssCode").value);
    const jsCode = encodeURIComponent(document.getElementById("jsCode").value);

    const shareLink = `${window.location.origin}${window.location.pathname}?html=${htmlCode}&css=${cssCode}&js=${jsCode}`;

    navigator.clipboard.writeText(shareLink)
        .then(() => {
            alert_message = "Link with content copied to clipboard! \n"+ "Link: "+ shareLink +"\nUse this link to access the below code."
            alert(alert_message);
        })
        .catch((error) => {
            console.error('Error copying to clipboard:', error);
        });


        const shareData = {
            title: 'Check out my code!',
            text: 'I created some awesome code using this online editor.',
            url: window.location.href
        };
    
        if (navigator.share) {
            navigator.share(shareData)
                .then(() => console.log('Shared successfully'))
                .catch((error) => console.error('Error sharing:', error));
        } else {
            console.log('Web Share API not supported on this browser.');
            
        }
}

function loadSharedCode() {
    const urlParams = new URLSearchParams(window.location.search);
    const htmlCode = decodeURIComponent(urlParams.get("html") || "");
    const cssCode = decodeURIComponent(urlParams.get("css") || "");
    const jsCode = decodeURIComponent(urlParams.get("js") || "");

    document.getElementById("htmlCode").value = htmlCode;
    document.getElementById("cssCode").value = cssCode;
    document.getElementById("jsCode").value = jsCode;
}

window.onload = loadSharedCode; 