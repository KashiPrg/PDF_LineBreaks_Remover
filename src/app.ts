

// 拡張機能がインストールされたときに右クリックメニューを追加
chrome.runtime.onInstalled.addListener((): void => {
    chrome.contextMenus.create({
        id: "convert_line_breaks_menu",
        title: chrome.i18n.getMessage("conMenuCopiedTextLineBreaksRemove"),
        contexts: ["all"],
        type: "normal",
        onclick: convertLineBreaks
    });
});

function convertLineBreaks(): void {
    chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
        if (tabs.length > 0) {
            // document.execCommand("copy")は何かしらの文面にフォーカスが当たっていないと使えないため、
            // フォーカス用のテキストエリアを用意する
            const textAreaForCopy = document.createElement("textarea");
            textAreaForCopy.textContent = ``;
            // そのページのbodyタグの要素を取得し、用意したテキストエリアを追加
            document.querySelector("body")?.append(textAreaForCopy);
            
            // テキストエリアを選択(なお、この時すでに選択している箇所は選択解除されない)
            textAreaForCopy.focus();
            // テキストエリアにクリップボードの文字列をペースト
            document.execCommand("paste");

            // テキストエリアの文字列に含まれる全ての改行を、半角スペース一つに置き換える
            // 空文字列にしないのは、行末が文末であった場合に"aaaaa.bbbbb"と続けて記述されるのを避けるため
            // 空行が挟まれていた場合は空行の数だけ半角スペースが生じることになるがそれはご愛嬌。パラグラフ単位での利用を想定している
            textAreaForCopy.value = textAreaForCopy.value.replace(/\n/g, ' ');

            // テキストエリアを選択(なお、この時すでに選択している箇所は選択解除されない)
            textAreaForCopy.select();
            // 選択された箇所をコピー
            document.execCommand("copy");
            // 追加されたテキストエリアは本来余分なものなので消しておく
            textAreaForCopy.remove();
        }
    });
}

chrome.commands.onCommand.addListener(function (command) {
    switch(command) {
        case "convert_LineBreaks":
            convertLineBreaks();
            break;
        default:
            break;
    }
});