// import '../styles/fonts.css';
// import '../styles/reg.css';
// import '../styles/animations.css';

document.getElementById('dateInput').addEventListener('input', function(e) {
  // Удаляем все, кроме цифр
  let value = this.value.replace(/\D/g, '');
  
  // Форматируем в yyyy-MM-dd
  if (value.length > 4) {
    value = value.substring(0, 4) + '-' + value.substring(4, 6) + '-' + value.substring(6, 8);
  } else if (value.length > 2) {
    value = value.substring(0, 4) + '-' + value.substring(4, 6);
  }
  
  // Ограничиваем длину (yyyy-MM-dd - 10 символов)
  if (value.length > 10) {
    value = value.substring(0, 10);
  }
  
  this.value = value;
});

document.addEventListener('DOMContentLoaded', function() {
  const customCheckbox = document.getElementById('customCheckbox');
  const originalCheckbox = document.getElementById('agreeCheckbox');
  const submitButton = document.getElementById('submitButton');
  
  // Клик по кастомному чекбоксу
  customCheckbox.addEventListener('click', function(e) {
    e.preventDefault();
    originalCheckbox.checked = !originalCheckbox.checked;
    customCheckbox.classList.toggle('checked', originalCheckbox.checked);
    updateButtonState();
  });
  
  // Клик по label (на случай, если пользователь кликнет на текст)
  document.querySelector('.checkbox-container').addEventListener('click', function(e) {
    if(e.target === this) { 
      e.preventDefault();
      originalCheckbox.checked = !originalCheckbox.checked;
      customCheckbox.classList.toggle('checked', originalCheckbox.checked);
      updateButtonState();
    }
  });
  
  // Функция обновления состояния кнопки
  function updateButtonState() {
    submitButton.disabled = !originalCheckbox.checked;
    const event = new Event('change', { bubbles: true });
    originalCheckbox.dispatchEvent(event);
  }
  
  updateButtonState();
  
  // Обработка клавиатуры для доступности
  customCheckbox.addEventListener('keydown', function(e) {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      originalCheckbox.checked = !originalCheckbox.checked;
      customCheckbox.classList.toggle('checked', originalCheckbox.checked);
      updateButtonState();
    }
  });
});



document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.registration-form');
    const submitButton = document.getElementById('submitButton');
    const agreeCheckbox = document.getElementById('agreeCheckbox');
    
    // Активировать кнопку при согласии
    // agreeCheckbox.addEventListener('change', function() {
    //     submitButton.disabled = !this.checked;
    // });
    
    // Обработка отправки формы
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Собираем данные формы
        const formData = {
          name: form.elements.name.value,
          vuz: form.elements.university.value,
          email: form.elements.email.value,
          birth: document.getElementById('dateInput').value
      };
        
        try {
            // Отправляем данные на сервер
            const response = await fetch('http://127.0.0.1:8000/api/form', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            
            if (response.ok) {
                alert('Форма успешно отправлена!');
                form.reset();
                submitButton.disabled = true;
            } else {
                throw new Error('Ошибка при отправке формы');
            }
        } catch (error) {
            console.error('Ошибка:', error);
            alert('Произошла ошибка при отправке формы');
        }
    });
});
