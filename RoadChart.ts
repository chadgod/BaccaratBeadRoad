import { TwoArray } from "./TwoArray";
import { RoadBall } from "./RoadBall";

/**座標 */
class Coordinate{
    public x:number;
    public y:number;
    constructor(x:number,y:number){
        this.x=x;
        this.y=y;
    }
}
/**
 * 珠路表
 */
export class RoadChart{
    private Table:TwoArray<RoadBall>;
    private PrePos:Coordinate;
    private width:number;
    private height:number;
    constructor(rows:number,columns:number){
        this.width = columns;
        this.height = rows;
        this.Table = new TwoArray(rows,columns,new RoadBall());
        this.PrePos = new Coordinate(0,-1);
    }
    public AddBeat(ball:RoadBall):void{
        let nextPos:Coordinate = this.getNextPos(ball);
        this.Table.setValue(nextPos.y,nextPos.x,ball);
        this.PrePos = nextPos;
    }
    /**取得下一個位置 */
    private getNextPos(new_ball:RoadBall):Coordinate{
        if( this.PrePos.y === -1 ){//第一顆
            return new Coordinate(0,0);
        }
        let pre_ball:RoadBall = this.Table.getValue(this.PrePos.y,this.PrePos.x);
        if( pre_ball.Kind === new_ball.Kind){//同一種球
            let right:boolean=false;
            if( this.PrePos.y+1 >= this.height ){//超出高度
                right = true;
            }
            else{
                let n_ball:RoadBall = this.Table.getValue(this.PrePos.y+1,this.PrePos.x);
                if( n_ball.Kind === 0){//下一個有空位
                    if( this.PrePos.x-1 >= 0 ){//有左邊
                        let nl_ball:RoadBall = this.Table.getValue(this.PrePos.y+1,this.PrePos.x-1);
                        if( nl_ball.Kind === new_ball.Kind ){//下一個的左邊是同一種,換列
                            right = true;
                        }
                    }
                    if( this.PrePos.y+2 < this.height ){//第二個沒超出高度
                        let nn_ball:RoadBall = this.Table.getValue(this.PrePos.y+2,this.PrePos.x);
                        if( nn_ball.Kind === new_ball.Kind){//第二個是同一種,換列
                            right = true;
                        }
                    }
                }
                else{
                    right = true;
                }
            }
            if( right ){
                if( this.PrePos.x+1 >= this.width ){//往右超出
                    this.ColumnsMoveLeft();
                }
                return new Coordinate(this.PrePos.x+1,this.PrePos.y);
            }
            else{
                return new Coordinate(this.PrePos.x,this.PrePos.y+1);
            }
        }
        else{//不同一種球,換列
            if( this.PrePos.x+1 >= this.width ){//往右超出
                this.ColumnsMoveLeft();
            }
            for(let i=0;i<this.PrePos.x+2;i++){
                let ball:RoadBall = this.Table.getValue(0,i);
                if( ball.Kind === 0 ){
                    return new Coordinate(i,0);
                }
            }
        }
        return new Coordinate(0,0);
    }
    /**整列向左移(原本最左列消去) */
    private ColumnsMoveLeft():void{
        this.PrePos.x -= 1;
        this.Table.ColumnsMoveLeft();
    }
    public PrintDebug():void{
        console.log(this.Table.getArray().map(ball=>
            ball.map(b=>b.Kind)
        ));
    }
}