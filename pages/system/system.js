import { generateUniqueKey } from '../../utils/GenerateUniqueKey.js';
const d = document;
d.addEventListener('DOMContentLoaded', (e) => {
    // sidebar
    const $menuBtn = d.querySelector('#menu-btn');
    const $sideBar = d.querySelector('.sidebar');
    // create
    const $addProductBtn = d.querySelector('#add-product-btn');
    const $createProductModal = d.querySelector('#create-product-modal');
    const $closeCreateModalBtn = d.querySelector('#close-create-modal-btn');
    const $createProductForm = d.querySelector('#create-product-form');
    // update
    const $updateProductModal = d.querySelector('#update-product-modal');
    const $closeUpdateProductModal = d.querySelector('#close-update-modal-btn');
    const $updateProductForm = d.querySelector('#update-product-form');
    const $table = d.querySelector('.table');
    const $tbody = $table.querySelector('tbody');
    const productData = JSON.parse(localStorage.getItem('productData') || '[]');
    productData.forEach((product) => {
        $tbody.innerHTML += `
      <tr>
        <td>${product.id}</td>
        <td>${product.name}</td>
        <td>${product.brand}</td>
        <td>${product.price}</td>
        <td>${product.category}</td>
        <td>
          <span data-id="${product.id}" class="material-symbols-outlined bg-orange icon-table-btn btn edit-btn">edit</span>
          <span data-id="${product.id}" class="material-symbols-outlined bg-red icon-table-btn btn delete-btn">delete</span>
        </td>
      </tr>
    `;
    });
    d.addEventListener('click', (e) => {
        const target = e.target;
        if (target === $menuBtn || $menuBtn.contains(target)) {
            $sideBar.classList.toggle('sidebar-disabled');
        }
        // create
        if (target === $addProductBtn ||
            target === $createProductModal ||
            target === $closeCreateModalBtn) {
            $createProductModal.classList.toggle('hidden-element');
        }
        // update
        if (target.matches('.edit-btn') || target.matches('.edit-btn *')) {
            const id = target.getAttribute('data-id');
            const productData = JSON.parse(localStorage.getItem('productData') || '[]');
            const product = productData.find((product) => product.id === id);
            $updateProductForm.productId.value = product.id;
            $updateProductForm.productName.value = product.name;
            $updateProductForm.brand.value = product.brand;
            $updateProductForm.price.value = product.price;
            $updateProductForm.category.value = product.category;
            $updateProductForm.warranty.value = product.warranty;
            $updateProductForm.description.value = product.description;
            $updateProductForm.uriImage.value = product.uriImage;
        }
        if (target === $updateProductModal ||
            target === $closeUpdateProductModal ||
            target.matches('.edit-btn') ||
            target.matches('.edit-btn *')) {
            $updateProductModal.classList.toggle('hidden-element');
        }
        if (target.matches('.delete-btn') || target.matches('.delete-btn *')) {
            if (confirm('¿Esta seguro de eliminar el producto?')) {
                const selectedProductId = target.getAttribute('data-id');
                const productData = JSON.parse(localStorage.getItem('productData') || '[]');
                const updatedProductData = productData.filter((product) => product.id !== selectedProductId);
                localStorage.setItem('productData', JSON.stringify(updatedProductData));
                location.reload();
            }
        }
    });
    d.addEventListener('submit', (e) => {
        const target = e.target;
        if (target === $createProductForm) {
            const targetForm = target;
            e.preventDefault();
            const uniqueKey = generateUniqueKey();
            const product = {
                id: uniqueKey,
                name: targetForm.productName.value.trim(),
                brand: targetForm.brand.value.trim(),
                price: targetForm.price.value.trim(),
                category: targetForm.category.value.trim(),
                warranty: targetForm.warranty.value.trim(),
                description: targetForm.description.value.trim(),
                uriImage: targetForm.uriImage.value.trim()
            };
            if (!localStorage.getItem('productData')) {
                localStorage.setItem('productData', JSON.stringify([product]));
            }
            else {
                const productData = JSON.parse(localStorage.getItem('productData') || '[]');
                const newProductData = [...productData, product];
                localStorage.setItem('productData', JSON.stringify(newProductData));
            }
            location.reload();
        }
        if (e.target === $updateProductForm) {
            const targetForm = target;
            e.preventDefault();
            const selectedProductId = targetForm.productId.value.trim();
            const productData = JSON.parse(localStorage.getItem('productData') || '[]');
            const updatedProduct = {
                id: targetForm.productId.value.trim(),
                name: targetForm.productName.value.trim(),
                brand: targetForm.brand.value.trim(),
                price: targetForm.price.value.trim(),
                category: targetForm.category.value.trim(),
                warranty: targetForm.warranty.value.trim(),
                description: targetForm.description.value.trim(),
                uriImage: targetForm.uriImage.value.trim()
            };
            const updatedProductData = productData.map((product) => product.id === selectedProductId
                ? updatedProduct
                : product);
            localStorage.setItem('productData', JSON.stringify(updatedProductData));
            location.reload();
        }
    });
});
