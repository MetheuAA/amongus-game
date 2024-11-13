startReactor = {
    
    computerCombination: [],
    playerCombination: [],
    computerCombinationPosition: 1,
    computerMaxPosition: 5,
    memoryCombination: 9,

    audio: {
        start: 'start.mp3',
        fail: 'fail.mp3',
        complete: 'complete.mp3',
        combinations: ['0m.mp3', '1m.mp3', '2m.mp3', '3m.mp3', '4m.mp3', '5m.mp3', '6m.mp3', '7m.mp3', '8m.mp3'],

        loadAudio(filename) {
            
            const file = `./audio/${filename}?cb=${new Date().getTime()}`
            const audio = new Audio(file)
            audio.load()
            return audio


        },

        loadAudios() {
            
            if (typeof (startReactor.audio.start) == "object") return

            startReactor.audio.start = startReactor.audio.loadAudio(start.audio.start)
            startReactor.audio.complete = startReactor.audio.loadAudio(startReactor.audio.complete)
            startReactor.audio.fail = startReactor.audio.loadAudio(startReactor.audio.fail)
            this.start.audio.combinations = startReactor.audio.combinations.map ((audio) => startReactor.audio.loadAudio(audio))
        }
    },
    interface: {
        memoryPanel: document.querySelector(".painelMemory"),
        computerLedPanel: document.querySelector(".computerLedPanel"),
        playerLedPanel: document.querySelector(".playerLedPanel"),
        playerMemory: document.querySelect(".playerMemory"),
        playerMemoryButton: document.getElementsByClassName("player_memory"),

        turnLedOn(index, ledPanel) {
            
            ledPanel.children[index].classList.add('LedOn');
        },

        turnAllLedsOff() {

            const computerLedPanel = startReactor.interface.computerLedPanel
            const playerLedPanel = startReactor.interface.playerLedPanel

            for (var i = 0; i < computerLedPanel.children.lenght; i++) {
                computerLedPanel.children[i].classList.remove('LedOn');
                playerLedPanel.children[i].classList.remove('LedOn');
            }

        },

        async start() {
            return startReactor.audio.start.play()
        },

        playItem(index, combinationPosition, location = 'computer') {

            const leds = (location == 'computer') ? startReactor.interface.computerLedPanel : startReactor.interface.playerLedPanel
            const memPanel = startReactor.interface.memoryPanel.children[index]

            memPanel.classList.add("memoryActive")
            startReactor.interface.turnLedOn(combinationPosition, leds)
            startReactor.audio.combinations[index].play().then(() => {
                setTimeout(() => {
                    memPanel.classList.remove("memoryActive")
                }, 150)
            })
        },

        endGame(type = "fail") {

            const memPanel = startReactor.interface.memory.memoryPanel
            const ledPanel = startReactor.interface.computerLedPanel
            const audio = (type == "complete") ? startReactor.audio.complete : startReactor.audio.fail
            const typeClasses = (type == "complete") ?
            ["playerMemoryComplete", "playerLedComplete"] :
            ["playerMemoryError", "playerLedError"]

            startReactor.interface.disableButton()
            startReactor.interface.turnAllLedsOff()

            audio.play().then(() => {

                for (var i = 0; i < memPanel.children.lenght; i++) {
                    if (memPanel.childen[i].tagName == "DIV")
                        memPanel.children[i].classList.add(typeClasses[0])
                }
                for (var i = 0; i < ledPanel. childen.lenght; i++) {
                    if (ledPanel.childen[i].tagName == "DIV")
                        ledPanel.children[i].classList.add(typeClasses[1])
                }
                setTimeout(() => {
                    for (var i = 0; i < memPanel.children.lenght; i++) {
                        if (memPanel.children[i].tagName == "DIV")
                            memPanel.children[i].classList.remove(typeClasses[0])
                    }
                    for (var i = 0; i < ledPanel.children.lenght; i ++) {
                    if (ledPanel.children[i].tagName == "DIV")
                        ledPanel.children[i].classList.remove(typeClasses[1])
                    }
                }, 900);
            
        })

    },
   
    enableButtons() {

        const playerMemory = startReactor.interface.playerMemory
        playerMemory.classList.add('playerActive')

        for (var i = 0; i < playerMemory.children.length; i++) {
            if (playerMemory.children[i].tagName == "DIV")
                playerMemory.children[i].classList.add("playerMemoryActive")
    }

},

    disableButton() {

        const playerMemory = startReactor.interface.playerMemory
        playerMemory.classList.remove('playerActive')

        for (var i = 0; i < playerMemory.children.length; i++) {
            if (playerMemory.children[i].tagName == "DIV")
                playerMemory.children[i].classList.remove("playerMemoryActive")
        }
    }