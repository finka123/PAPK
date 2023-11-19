document.addEventListener('alpine:init', () => {
  Alpine.data('products', () => ({
    items: [
      { id: 1, name: 'DAIA 1Kg', img: '2.jpg', price: 30000 },
      { id: 2, name: 'Beras 5Kg', img: '6.jpg', price: 50000 },
      { id: 3, name: 'Maxicorn', img: '4.jpg', price: 15000 },
      { id: 4, name: 'Rinso Cair', img: '3.jpg', price: 10000 },
      { id: 5, name: 'Indomie Goreng', img: '7.jpg', price: 3000 },
      { id: 6, name: 'Teh Pucuk', img: '8.jpg', price: 5000 },
      { id: 7, name: 'Obat paramek', img: '1.jpg', price: 2500 },
      { id: 8, name: 'TeaJus Teh', img: '9.jpg', price: 500 },
      { id: 9, name: 'TeaJus Melon', img: '11.jpg', price: 1000 },
    ],

  }));

  Alpine.store('cart', {
    items: [],
    total: 0,
    quantity: 0,
    add(newItem) {

      const cartItem = this.items.find((item) => item.id === newItem.id);

      if (!cartItem) {
        this.items.push({ ...newItem, quantity: 1, total: newItem.price });
        this.quantity++;
        this.total += newItem.price;
      } else {
        this.items = this.items.map((item) => {
          if (item.id !== newItem.id) {
            return item;
          } else {
            item.quantity++;
            item.total = item.price * item.quantity;
            this.quantity++;
            this.total += item.price;
            return item;
          }


        });
      }

    },
    remove(id) {
      const cartItem = this.items.find((item) => item.id === id);
      if (cartItem.quantity > 1) {
        this.items = this.items.map((item) => {
          if (item.id !== id) {
            return item;
          } else {
            item.quantity--;
            item.total = item.price * item.quantity;
            this.quantity--;
            this.total -= item.price;
            return item;

          }
        });
      } else if (cartItem.quantity === 1) {
        this.items = this.items.filter((item) => item.id !== id);
        this.quantity--;
        this.total -= cartItem.price;
      }
    }
  });
});

const rupiah = (number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(number);
}

