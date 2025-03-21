const ingredients = ["avocado", "ananas", "cashew nuts", "kale", "mango", "peppers", "corn", "wakame", "tomatoes", "carrots", "salad"];
const proteins = ["salmon", "tuna", "chicken", "tofu"];
const bases = ["rice", "black rice", "salad"];
const sizes = ["R", "M", "L"];
function PokeBowl(size, quantity){
    this.id = Math.floor(Math.random() * 1000000);;
    this.size = size;
    this.base = base;
    this.proteins = proteins;
    this.ingredients = ingredients;
    this.quantity = quantity;

    const basePrices = { R: 9, M: 11, L: 14 };
    const maxProteins = { R: 1, M: 2, L: 4 };
    const maxIngredients = { R: 4, M: 4, L: 6 };

    this.getPrice = function () {
        let price = basePrices[this.size];

        // price for extra ingredients
        if (this.ingredients.length > maxIngredients[this.size]) {
            let extraCount = this.ingredients.length - maxIngredients[this.size];
            price += (price * 0.2) * extraCount;
        }

        return price;
    };

    this.addIngredient = (ingredient)=>{
        if(this.ingredients.length >= maxIngredients[this.size]){
            throw new Error("You can only add " + maxIngredients[this.size] + " ingredients to your bowl");
        }
        this.ingredients.push(ingredient);
    }

    this.removeIngredient = (ingredient)=>{
        this.ingredients = this.ingredients.filter(ing => ing.id !== ingredient.id);
    }

    this.addProtein = (protein)=>{
        if(this.proteins.length >= maxProteins[this.size]){
            throw new Error("You can only add " + maxProteins[this.size] + " proteins to your bowl");
        }
        this.proteins.push(protein);
    }
    this.removeProtein = (protein)=>{
        this.proteins = this.proteins.filter(pro => pro.id !== protein.id);
    }

    this.updateBase = (base)=>{
        this.base = base;
    }

    this.updateQuantity = (quantity)=>{
        this.quantity = quantity;
    }
}

function Order(userId, specialRequest = "") {
    this.id = Date.now() + Math.random().toString(36).substr(2, 9); // Unique ID
    this.userId = userId; // User who placed the order
    this.bowls = []; // List of PokeBowl objects
    this.specialRequest = specialRequest; // Special requests/allergies

    this.addBowl = function (bowl) {
        if (bowl instanceof PokeBowl && bowl.quantity > 0) {
            this.bowls.push(bowl);
        } else {
            throw new Error("Invalid bowl type or quantity");
        }
    };

    this.removeBowl = function (bowl) {
        this.bowls = this.bowls.filter(b => b.id !== bowl.id);
    }

    this.getTotalPrice = function () {
        let total = this.bowls.reduce((sum, bowl) => sum + bowl.getPrice(), 0);
        // Apply 10% discount if more than 4 bowls
        let totalBowls = this.bowls.reduce((sum, bowl) => sum + bowl.quantity, 0);
        if (totalBowls > 4) {
            total *= 0.9;
        }

        return total;
    };
}

function User(name, email, password) {
    this.id = Math.floor(Math.random() * 1000000);
    this.name = name;
    this.email = email;
    this.password = password;
    this.orders = []; // List of past Order objects

    this.addOrder = function (order) {
        if (order instanceof Order) {
            this.orders.push(order);
        } else {
            throw new Error("Invalid order type");
        }
    };

    this.removeOrder = function (order) {
        this.orders = this.orders.filter(o => o.id !== order.id);
    }

    this.getOrders = function () {
        return this.orders;
    }


}

function Restaurant() {
    this.ordersPlaced = []; // List of Order objects

    this.addOrder = function (order) {
        if (order instanceof Order) {
            this.ordersPlaced.push(order);
        } else {
            throw new Error("Invalid order type");
        }
    };

    this.removeOrder = function (order) {
        this.orders = this.orders.filter(o => o.id !== order.id);
    }

    this.getOrders = function () {
        return this.ordersPlaced;
    }
}