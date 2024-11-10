class TreasureMap {  
    static async fetchLocationData() {  
        const response = await fetch('locations.txt');  
        const data = await response.text();  
        return data.split('\n').map(line => line.trim()).filter(line => line);  
    }  

    static async getInitialClue() {  
        return new Promise((resolve) => {  
            setTimeout(() => {  
                resolve("在古老的图书馆里找到了第一个线索...");  
            }, 1000);  
        });  
    }  

    static async decodeAncientScript(clue) {  
        return new Promise((resolve, reject) => {  
            setTimeout(() => {  
                if (!clue) {  
                    reject("没有线索可以解码!");  
                }  
                resolve("解码成功!宝藏在一座古老的神庙中...");  
            }, 1500);  
        });  
    }  

    static async searchTemple(location) {  
        return new Promise((resolve, reject) => {  
            setTimeout(() => {  
                const random = Math.random();  
                if (random < 0.5) {  
                    reject("糟糕!遇到了神庙守卫!");  
                }  
                resolve("找到了一个神秘的箱子...");  
            }, 2000);  
        });  
    }  

    static async openTreasureBox() {  
        return new Promise((resolve) => {  
            setTimeout(() => {  
                resolve("恭喜!你找到了传说中的宝藏!");  
            }, 1000);  
        });  
    }  
}  

function storePlayerInfo(id, name) {  
    const playerData = {  
        id: id,  
        name: name,  
        history: []  
    };  
    localStorage.setItem('playerInfo', JSON.stringify(playerData));  
}  

function loadPlayerInfo() {  
    const storedInfo = localStorage.getItem('playerInfo');  
    if (storedInfo) {  
        const playerData = JSON.parse(storedInfo);  
        document.getElementById('playerId').innerText = playerData.id;  
        document.getElementById('playerName').innerText = playerData.name;  
        document.getElementById('playerInfo').classList.remove('hidden');  
        const gameHistoryList = document.getElementById('gameHistory');  
        gameHistoryList.innerHTML = '';  
        playerData.history.forEach(item => {  
            const li = document.createElement('li');  
            li.innerText = item;  
            gameHistoryList.appendChild(li);  
        });  
        return playerData;  
    }  
    return null;  
}  

async function findTreasureWithAsyncAwait() {  
    const output = document.getElementById('output');  
    const animation = document.getElementById('animation');  
    output.innerHTML = ""; // 清空输出区域  
    animation.classList.remove('hidden'); // 显示动画  
    document.getElementById('backgroundMusic').play(); // 播放背景音乐  

    try {  
        const clue = await TreasureMap.getInitialClue();  
        output.innerHTML += `<p>${clue}</p>`;  
        
        const script = await TreasureMap.decodeAncientScript(clue);  
        output.innerHTML += `<p>${script}</p>`;  
        
        const box = await TreasureMap.searchTemple(script);  
        output.innerHTML += `<p>${box}</p>`;  
        
        const treasure = await TreasureMap.openTreasureBox();  
        output.innerHTML += `<p>${treasure}</p>`;  

        // 存储游戏历史  
        let playerData = loadPlayerInfo();  
        if (playerData) {  
            playerData.history.push(treasure);  
            localStorage.setItem('playerInfo', JSON.stringify(playerData));  
        }  
    } catch (error) {  
        output.innerHTML += `<p style="color: red;">任务失败: ${error}</p>`;  
    } finally {  
        animation.classList.add('hidden'); // 隐藏动画  
    }  
}  

document.getElementById('startButton').addEventListener('click', () => {  
    const playerId = document.getElementById('playerIdInput').value;  
    const playerName = document.getElementById('playerNameInput').value;  

    if (playerId && playerName) {  
        storePlayerInfo(playerId, playerName);  
        findTreasureWithAsyncAwait();  
    } else {  
        alert("请填写玩家ID和昵称!");  
    }  
});  

// 加载玩家信息  
loadPlayerInfo();