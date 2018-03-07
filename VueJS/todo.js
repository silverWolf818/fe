const vm = new Vue({
    el:'#app',
    directives:{
      focus(el,bindings){
          if(bindings.value){
              el.focus();
          }
      }
    },
    data:{
        title:'',
        cur:'',
        todos:[
            { isSelected:false,title:'睡觉' },
            { isSelected:false,title:'吃饭' }
        ]
    },
    methods:{
        add(){
            this.todos.push({
                isSelected:false,
                title:this.title
            });
            this.title = '';
        },
        remove(todo){
            this.todos = this.todos.filter(item=>item!==todo);
        },
        remember(todo){
            this.cur = todo;

        },
        cancel(){
            this.cur = '';
        }
    },
    computed:{
        count(){
            return this.todos.filter(item=>!item.isSelected).length;
        }
    }
});