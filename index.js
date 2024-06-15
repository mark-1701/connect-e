const d = document;
d.addEventListener('DOMContentLoaded', (e) => {
    const productData = JSON.parse(localStorage.getItem('productData') || '[]');
    const $products = d.querySelector('#products');
    productData.some((product, index) => {
        $products.innerHTML += `
    <div class="target">
      <div class="target-image">
        <img src="${product.uriImage}" alt="imagen" />
      </div>
      <div class="target-footer">
        <p class="subtitle">${product.name}</p>
      </div>
    </div>
  `;
        return index === 3;
    });
    const images = $products.querySelectorAll('img');
    images.forEach((img) => {
        img.addEventListener('error', (e) => {
            const target = e.target;
            target.src = './assets/img/image_not_found.jpg';
        });
    });
});
export {};
