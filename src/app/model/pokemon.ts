export class Pokemon {

    id: number;
    nombre: string;
    habilidades: Array<any>;
    imagen: string;
    

    constructor(nombre: string) {
        this.id = 0;
        this.nombre = '';
        this.habilidades = [];
        this.imagen = 'https://cdn.pixabay.com/photo/2019/11/27/14/06/pokemon-4657023_960_720.png';
    }




}
/*
export class Pokemon {

    private _id: number;
    private _imagen: string;
    private _nombre: string;
    private _habilidades: Array<string>; //guardamos todas las habilidades del pokemon


    //constructor:
    constructor(nombre: string) {
        this._id = 0;
        this.nombre = nombre;
        this._imagen = 'https://cdn.pixabay.com/photo/2019/11/27/14/06/pokemon-4657023_960_720.png';
        this._habilidades = [];
    }

    //getters y setters:
    public get nombre(): string {
        return this._nombre;
    }

    public set nombre(value: string) {
        this._nombre = ( value !== undefined && value !== '' ) ? value : 'sin nombre';
    }

    public get imagen(): string {
        return this._imagen;
    }

    public set imagen(value: string) {
        this._imagen = value;
    }

    public get id(): number {
        return this._id;
    }
    
    public set id(value: number) {
        this._id = value;
    }

    public get habilidades(): Array<string> {
        return this._habilidades;
    }

    public set habilidades(value: Array<string>) {
        this._habilidades = value;
    }
   

}

*/