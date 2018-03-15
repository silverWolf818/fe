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
        ],
        hash:''
    },
    created(){
        this.todos = JSON.parse(localStorage.getItem('data')) || this.todos;
        this.hash = window.location.hash.slice(2) || 'all';
        window.addEventListener('hashchange',()=>{
            console.log(window.location.hash);
            this.hash = window.location.hash.slice(2);
        },false);
    },
    watch:{
      todos:{
          handler(){
             localStorage.setItem('data',JSON.stringify(this.todos));
          },
          deep:true
      }
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
        },
        filterTodos() {
            if (this.hash === 'all') return this.todos;
            if (this.hash === 'finish') return this.todos.filter(item=>item.isSelected);
            if (this.hash === 'unfinish') return this.todos.filter(item=>!item.isSelected);
            return this.todos;
        }
    }
});