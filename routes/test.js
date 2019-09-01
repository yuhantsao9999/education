async.waterfall([
    (next) => {

        let user_id_arr = [];
        connection.query(`SELECT * FROM products LIMIT ${api_count_perpage} OFFSET ${offset_value}`, (err1, result1) => {
            for (let i = 0; i < result1.length; i++) {
                user_id_arr.push(result1[i].id);
            }
            let user_id_string = user_id_arr.join(',')
            next(err1, result1, user_id_string);
        });

    },
    (result1, user_id_string, next) => {

        connection.query(`SELECT * FROM variants WHERE id in (${user_id_string})`, (err2, result2) => {
            let variants_arr = [];
            let colors_arr = [];
            let sizes_arr = [];

            for (let i = 0; i < result2.length; i++) {
                variants_arr.push({ color_code: result2[i].color_code, size: result2[i].size, stock: result2[i].stock });
                colors_arr.push({ code: result2[i].color_code, name: result2[i].name });
                sizes_arr.push(result2[i].size);
            }

            let variant_arr_id = [];
            let colors_arr_id = [];
            let sizes_arr_id = [];
            let count = 0;
            variant_arr_id[count] = [];
            colors_arr_id[count] = [];
            sizes_arr_id[count] = [];


            for (let i = 0; i < result2.length; i++) {
                if (i === 0 || result2[i].id === result2[i - 1].id) {
                    variant_arr_id[count].push(variants_arr[i]);
                    colors_arr_id[count].push(colors_arr[i]);
                    sizes_arr_id[count].push(sizes_arr[i])

                } else {
                    count++;
                    variant_arr_id[count] = [];
                    colors_arr_id[count] = [];
                    sizes_arr_id[count] = [];
                    variant_arr_id[count].push(variants_arr[i]);
                    colors_arr_id[count].push(colors_arr[i]);
                    sizes_arr_id[count].push(sizes_arr[i]);

                }
            }

            let sizes_arr_id_new = [];
            for (let i = 0; i < sizes_arr_id.length; i++) {
                sizes_arr_id_new.push([...new Set(sizes_arr_id[i])]);
            }

            function getUnique(arr, comp) {
                const unique = arr
                    .map(e => e[comp])
                    .map((e, i, final) => final.indexOf(e) === i && i)
                    .filter(e => arr[e]).map(e => arr[e]);
                return unique;
            }

            let colors_arr_id_new = [];
            for (let i = 0; i < colors_arr_id.length; i++) {
                colors_arr_id_new.push(getUnique(colors_arr_id[i], 'code'));
            }

            next(err2, result1, user_id_string, sizes_arr_id_new, colors_arr_id_new, variant_arr_id);
        });
    },
    (result1, user_id_string, sizes_arr_id_new, colors_arr_id_new, variant_arr_id, next) => {

        connection.query(`SELECT * FROM images WHERE id in (${user_id_string})`, (err3, result3) => {
            let images_arr = [];
            for (let i = 0; i < result3.length; i++) {
                images_arr.push(result3[i].images);
            }

            let images_arr_id = [];
            let count = 0;
            images_arr_id[count] = [];

            for (let i = 0; i < result3.length; i++) {
                if (i === 0 || result3[i].id === result3[i - 1].id) {
                    images_arr_id[count].push(images_arr[i]);

                } else {
                    count++;
                    images_arr_id[count] = [];
                    images_arr_id[count].push(images_arr[i]);
                }
            }
            next(err3, result1, sizes_arr_id_new, colors_arr_id_new, variant_arr_id, images_arr_id);
        });
    },
    (result1, sizes_arr_id_new, colors_arr_id_new, variant_arr_id, images_arr_id, next) => {

        connection.query('SELECT COUNT(id) FROM products', (err4, result4) => {

            let products_arr = [];
            let prodcuts_obj = {};

            for (let i = 0; i < result1.length; i++) {
                products_arr.push({ id: result1[i].id, title: result1[i].title, description: result1[i].description, price: result1[i].price, texture: result1[i].texture, wash: result1[i].wash, place: result1[i].place, note: result1[i].note, story: result1[i].story, size: sizes_arr_id_new[i], color: colors_arr_id_new[i], variants: variant_arr_id[i], main_image: result1[i].main_image, images: images_arr_id[i] });
            }

            prodcuts_obj['data'] = products_arr;

            let limit_value = (page + 1) * api_count_perpage;

            if (result4[0]["COUNT(id)"] - limit_value <= 0) {
                console.log('no more page')
            } else {
                prodcuts_obj['paging'] = page + 1
            }

            if (prodcuts_obj.data.length == 0) {
                return res.json(errMsg);
            } else {
                res.json(prodcuts_obj);
            }
            next(err4, prodcuts_obj);
        });
    }
], (err, rst) => {
    if (err) return err;
});