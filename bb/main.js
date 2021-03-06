VAR THROUGH=REQUIRE("./THROUGH");
VAR FACTORY=REQUIRE("./FACTORY");
VAR FS=REQUIRE("FS");
CLASS MYGULP{
    CONSTRUCTOR(){
        THIS.TASKARR=[];
        VAR THAT=THIS;
        THAT.ARGV=PROCESS.ARGV[2]||"DEFAULT";
        PROCESS.NEXTTICK(FUNCTION(){
            THAT.RUN()
        })

    }
    SRC(PATH){
        RETURN THROUGH.OBJREAD(FUNCTION(){
           THIS.PUSH(FACTORY(PATH));
           THIS.PUSH(NULL);
        })
    }
    DEST(PATH){
        RETURN THROUGH.OBJ(FUNCTION(A,B,C){
             FS.WRITEFILESYNC(PATH,A.CONTENT)
            C();
        })
    }
    TASK(TASKNAME,CALLBACK){
       VAR OBJ={};
        OBJ[TASKNAME]=CALLBACK;
       THIS.TASKARR.PUSH(OBJ);
    }
    RUN(){
      VAR THAT=THIS;
      THAT.TASKARR.FOREACH(FUNCTION(OBJ){
         IF(OBJECT.KEYS(OBJ)[0]==THAT.ARGV){
             OBJ[THAT.ARGV]();
         }
      })
    }
    

}

MODULE.EXPORTS=NEW MYGULP();