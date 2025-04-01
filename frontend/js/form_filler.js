class FormFiller {

    static apply(data) {

        for (let key in data) {

            const el = document.getElementById(key);
            if (el) {
                el.value = data[key];
            }
            
        }

    }

}