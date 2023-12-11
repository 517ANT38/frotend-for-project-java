class Restorant{
    _img
    get img() {
        return this._img
    }
    set img(value) {
        this._img = value
    }
    _name
    get name() {
        return this._name
    }
    set name(value) {
        this._name = value
    }
    _highCost
    get highCost() {
        return this._highCost
    }
    set highCost(value) {
        this._highCost = value
    }
    _aboutDeliviryText
    get aboutDeliviryText() {
        return this._aboutDeliviryText
    }
    set aboutDeliviryText(value) {
        this._aboutDeliviryText = value
    }
    _rating
    get rating() {
        return this._rating
    }
    set rating(value) {
        this._rating = value
    }
    constructor(img,name,highCost,aboutDeliviryText,rating){
        this.img=img;
        this.name=name;
        this.highCost=highCost;
        this.aboutDeliviryText=aboutDeliviryText;
        this.rating=rating;
    }
   
}
export default Restorant;