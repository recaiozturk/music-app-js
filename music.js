class Music{
    constructor(title,singer,img,file){
        this.title=title;
        this.singer=singer;
        this.img=img;
        this.file=file;
    }

    getName(){
        return this.title+" - "+this.singer;
    }
}

const musicList=[
    new Music("Legend of the Eagle Bearer","Assassin's Creed Odyssey","1.jpg","1.mp3"),
    new Music("No Time For Caution","Hans Zimmer","2.jpeg","2.mp3"),
    new Music("The Dark Knight OST","Hans Zimmer","3.jpg","3.mp3"),
];