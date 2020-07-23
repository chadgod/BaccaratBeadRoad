/**
 * 2維陣列
 */
export class TwoArray<T>{
    private _2DArray : Array<Array<T>> =  new Array<Array<T>>();
    private rows :number;
    private columns :number;
    private InitValue:T;
    /**
     * 初始化陣列 行(直),列(橫)
     */
    public constructor(rows:number,columns:number,value:T){
        this.rows = rows;
        this.columns = columns;
        this.InitValue = value;
        this.initRows(rows);
        this.initColumns(columns,value);
    }
    /**
     * 取陣列中的值
     */
    public getValue(rows:number,columns:number):T{
        if(rows < 0 || columns < 0 || rows >= this.rows || columns >= this.columns){
            return null as any;
        }
        return this._2DArray[rows][columns];
    }
    /**
     * 為陣列賦值
     */
    public setValue(rows:number,columns:number,value:T):void{
        if(rows < 0 || columns < 0 || rows >= this.rows || columns >= this.columns){
            return ;
        }
        this._2DArray[rows][columns] = value;
    }
    /**
     * 初始化行數
     */
    private initRows(rows:number):void{
        if(rows < 1) {
            return;
        }
        for(let i = 0 ; i < rows ; i ++){
            this._2DArray.push(new Array<T>());
        }
    }
    /**
     * 初始化列數
     */
    private initColumns(columns:number,value:T):void{
        if(columns < 1){
            return;
        }
        for(let i = 0 ; i < this._2DArray.length ; i ++){
            for(let j = 0 ; j < columns ; j ++){
                this._2DArray[i].push(value);
            }
        }
    }
    /**
     * 獲取陣列
     */
    public getArray():Array<Array<T>>{
        return this._2DArray;
    }
    /**整列向左移一格 */
    public ColumnsMoveLeft():void{
        for(let i = 0 ; i < this._2DArray.length ; i ++){
            let newArr:Array<T> = new Array<T>();
            for(let j = 1 ; j < this.columns ; j ++){
                newArr.push(this._2DArray[i][j]);
            }
            newArr.push(this.InitValue);
            this._2DArray[i] = newArr;
        }
    }
}