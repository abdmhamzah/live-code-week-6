$(document).ready(function(){
    if (!localStorage.token || localStorage.token == null) {
        $('#field_login').show()
        $('#field_app').hide()
    } else {
        getFoods()
        $('#field_login').hide()
        $('#field_app').show()
    }

    // SIGNIN
    $('#signin').submit(function(e){
        e.preventDefault()

        const user = {
            email: $('#signin_email').val(),
            password: $('#signin_password').val()
        }

        $.ajax({
            url: 'http://localhost:3000/signin',
            method: 'POST',
            data: user
        })
            .done(signin => {
                $('#signin_email').val('')
                $('#signin_password').val('')

                getFoods()
                $('#field_login').hide()
                $('#field_app').show()

                localStorage.setItem('token', signin.token)
            })
            .fail(err => {
                console.log(err);
            })
    })


    // SIGNOUT
    $('#signout').click(function(e){
        e.preventDefault()

        $('#field_login').show()
        $('#field_app').hide()

        localStorage.removeItem('token')
    })


    // ADD FOOD
    $('#addFood').submit(function(e){
        e.preventDefault()

        const token = localStorage.getItem('token')

        const food = {
            title: $('#food_title').val(),
            price: $('#food_price').val(),
            ingredients: $('#food_ingredients').val(),
            tag: $('#food_tag').val(),
        }

        $.ajax({
            url: 'http://localhost:3000/foods',
            method: 'POST',
            data: food,
            headers: {
                token: token
            }
        })
            .done(food => {
                $('#food_title').val('')
                $('#food_price').val('')
                $('#food_ingredients').val('')
                $('#food_tag').val('')

                getFoods()
                $('#field_login').hide()
                $('#field_app').show()
            })
            .fail(err => {
                console.log(err);
            })
    })


    // GET FOODS
    function getFoods(){
    
        const token = localStorage.getItem('token')
        console.log(token);
        
    
        $.ajax({
            url: 'http://localhost:3000/foods',
            method: 'GET',
            headers: {
                token: token
            }
        })
            .done(foods => {
                foods.foods.forEach(el => {
                    $('#listFood').append(`
                        <div class="card">
                            <div class="card-body pb-0">
                                <div class="d-flex justify-content-between mb-0">
                                <div class="col-9">
                                    <h5 class="font-weight-bold"> ${el.title} </h5>
                                    <p>${el.price}</p>
                                </div>
                                <div class="col-3 d-flex align-items-baseline">
                                    <i class="fas fa-tag text-grey mr-2"></i>
                                    <p class="text-grey">${el.tag}</p>
                                    <button class="fas fa-trash text-danger ml-auto cursor-pointer"></button>
                                </div>
                                </div>
                                <div class="card-body border-bottom">
                                ${el.ingredients}
                                </div>
                            </div>
                        </div>
                    `)
                });
            })
    }


    // DELETE FOODS

})
