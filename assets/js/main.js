//LOGIC

var app = new Vue({
    el: '#app',
    data: {
        products: [
            {
                id: 1,
                category: 'wm',
                img: './assets/images/wm1.jpg',
                name: 'Washing Machine 1',
                desc: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat amet`,
                descmodal: `Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                Placeat voluptatibus sapiente aliquid deleniti, rem nisi!
                `,
                price: 1_800_000,
                modal_id: 'wm1',
                modalw: '#wm1',
                order_amount: 1,
            },
            {
                id: 2,
                category: 'wm',
                img: './assets/images/wm2.jpg',
                name: 'Washing Machine 2',
                desc: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat amet`,
                descmodal: `Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                Placeat voluptatibus sapiente aliquid deleniti, rem nisi!
                `,
                price: 1_900_000,
                modal_id: 'wm2',
                modalw: '#wm2',
                order_amount: 1,
            },
            {
                id: 3,
                category: 'frdg',
                img: './assets/images/frid1.jpg',
                name: 'Fridge 1',
                desc: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat amet`,
                descmodal: `Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                Placeat voluptatibus sapiente aliquid deleniti, rem nisi! 
                `,
                price: 2_600_000,
                modal_id: 'frd1',
                modalw: '#frd1',
                order_amount: 1,
            },
            {
                id: 4,
                category: 'frdg',
                img: './assets/images/frid2.jpeg',
                name: 'Fridge 2',
                desc: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat amet`,
                descmodal: `Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                Placeat voluptatibus sapiente aliquid deleniti, rem nisi! 
                `,
                price: 1_980_000,
                modal_id: 'frd2',
                modalw: '#frd2',
                order_amount: 1,
            },
            {
                id: 5,
                category: 'fry',
                img: './assets/images/fry1.png',
                name: 'Fryer 1',
                desc: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat amet`,
                descmodal: `Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                Placeat voluptatibus sapiente aliquid deleniti, rem nisi!`,
                price: 350_000,
                modal_id: 'fry1',
                modalw: '#fry1',
                order_amount: 1,
            },
            {
                id: 6,
                category: 'fry',
                img: './assets/images/fry2.jpg',
                name: 'Fryer 2',
                desc: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat amet`,
                descmodal: `Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                Placeat voluptatibus sapiente aliquid deleniti, rem nisi!`,
                price: 685_000,
                modal_id: 'fry2',
                modalw: '#fry2',
                order_amount: 1,
            },
            {
                id: 7,
                category: 'tvs',
                img: './assets/images/tv1.jpg',
                name: 'Smart TV 1',
                desc: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat amet`,
                descmodal: `Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                Placeat voluptatibus sapiente aliquid deleniti, rem nisi!`,
                price: 2_300_000,
                modal_id: 'tv1',
                modalw: '#tv1',
                order_amount: 1,
            },
            {
                id: 8,
                category: 'tvs',
                img: './assets/images/tv2.jpg',
                name: 'Smart TV 2',
                desc: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat amet`,
                descmodal: `Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                Placeat voluptatibus sapiente aliquid deleniti, rem nisi!`,
                price: 2_500_000,
                modal_id: 'tv2',
                modalw: '#tv2',
                order_amount: 1,
            },
        ],
        fproducts: [],
        cart: [],//empty array that will store the client's orders
        order: [],
        totalCart: 0,
        //variables below
        fcartN: '',
        modaltrigger: 0,
        foption: '',
        soption: '',
        ptrigger: 0,
        paymethod: '',
        totalsales: 0,
        totalcancelled: 0,
        nonsold: 0,
        npurchased: 0,
    },
    methods: {
        minusbtn(item){
            if (item.order_amount > 0) {
                item.order_amount -= 1;
            } 
        },
        plusbtn(item){
            if (item.order_amount < 20) {
                item.order_amount += 1;
            } 
        },
        closemodal(item){
            item.order_amount = 1;
        },
        cartClick(){
            if (this.cart.length > 0) {
                const total = this.cart.map(element => element.price * element.qty).reduce((a, b) => a + b, 0);
                this.totalCart = new Intl.NumberFormat('es-ES', {style: 'currency',currency: 'COP', minimumFractionDigits: 0}).format(total);
            }
        },
        addToCart(item){
            if(item.order_amount > 0 && item.order_amount < 20) {
                
                this.cart.push({
                    img: item.img,
                    prod: item.name,
                    qty: item.order_amount,
                    price: item.price,
                });

                /*acc -> accumulator; cv -> current value*/
                this.cart = this.cart.reduce((acc, cv) => {
                    const elementExists = acc.find(e => e.prod === cv.prod);
                    if (elementExists) {
                    return acc.map((e) => {
                        if (e.prod === cv.prod) {
                        return {
                            ...e,
                            qty: e.qty + cv.qty
                        }
                        }
                        return e;
                    });
                    }
                    return [...acc, cv];
                }, []);

                this.fcartN = this.cart.length;

                alert(`${item.order_amount} ${item.name} were added to cart`);
                item.order_amount = 1;

            }else{
                alert('You must add at least one product');
            }
        },
        payments(){
            if (this.cart.length > 0) {
                this.ptrigger = 1;
            }else{
                alert('The cart is empty, please add at leat one product');
            }
            
        },
        cancelpurchase(){
            if (confirm("Do you want to cancel your purchase?") === true){
                alert('Your purchase order has been successfully cancelled');
                this.cancel();
            }
        },
        sendorder(){
            if (this.cart.length > 0) {

                if (this.paymethod.length <= 0) {
                    alert('Please select a payment method');
                }else{
                    const totalp = this.cart.map(element => element.price * element.qty).reduce((a, b) => a + b, 0);
                    this.order.push({
                        id: this.order.length + 1,
                        order: [],
                        totalp: totalp,
                        statusAdmin: 'Pagado',
                        totalc: 0,
                    });
                    
                    const prodqty = this.cart.map(e => {
                        return{
                            prod: e.prod,
                            qty: e.qty
                        }
                    });
    
                    this.order[this.order.length - 1].order = prodqty;
                    if (this.order[this.order.length - 1].statusAdmin === 'Pagado') {
                        this.npurchased += 1;
                    }
                    const sumtotals = this.order.map(element => element.totalp).reduce((a, b) => a + b, 0);
                    this.totalsales = new Intl.NumberFormat('es-ES', {style: 'currency',currency: 'COP', minimumFractionDigits: 0}).format(sumtotals);
                    console.table(this.order);
                    alert('Your purchase order has been successfully processed');
                    this.cancel();
                }
            }else{
                alert('The cart is empty, please add at least one product');
            }
        },
        delFromCart(index){
            this.cart.splice(index, 1);
            const total = this.cart.map(element => element.price * element.qty).reduce((a, b) => a + b, 0);
            this.totalCart = new Intl.NumberFormat('es-ES', {style: 'currency',currency: 'COP', minimumFractionDigits: 0}).format(total);
            if (this.cart.length > 0) {
                this.fcartN = this.cart.length;
            }else{
                this.fcartN = '';
            }
        },
        cancel(){
            if (this.cart.length > 0) {
                this.cart.splice(0, this.cart.length);
                const total = this.cart.map(element => element.price * element.qty).reduce((a, b) => a + b, 0);
                this.totalCart = new Intl.NumberFormat('es-ES', {style: 'currency',currency: 'COP', minimumFractionDigits: 0}).format(total);
                this.products.forEach(element => element.order_amount = 1);
                this.fcartN = '';
                this.ptrigger = 0;
                this.paymethod = '';
            }else{
                alert('The cart is empty, please add at least one product');
                const total = this.cart.map(element => element.price * element.qty).reduce((a, b) => a + b, 0);
                this.totalCart = new Intl.NumberFormat('es-ES', {style: 'currency',currency: 'COP', minimumFractionDigits: 0}).format(total);
            }
        },
        filter(){
            if (this.foption === 'all') {
                this.fproducts = this.products;
            }else{
                const result = this.products.filter(e => e.category === this.foption);
                this.fproducts = result;
            }
            
        },
        search(){
            this.fproducts = this.products.filter(e => e.name.toLowerCase().includes(this.soption));
        }
    },
    beforeMount(){
        this.fproducts = this.products;
    }
});
