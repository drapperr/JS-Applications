(() => {
    String.prototype.ensureStart = function (str) {
        if (!this.toString().startsWith(str)) {
            return str.concat(this);
        }
        return this.toString();
    }

    String.prototype.ensureEnd = function (str) {
        if (!this.toString().includes(str)) {
            return this.concat(str);
        }
        return this.toString();
    }

    String.prototype.isEmpty = function () {
        return !this.toString();
    }

    String.prototype.truncate = function (n) {
        if (n < 4) {
            return '.'.repeat(n);
        }
        if (this.toString().length <= n) {
            return this.toString();
        }

        let splitedStr = this.toString().split(' ');

        if (splitedStr.length === 1) {
            return this.toString().slice(0, n - 3).concat('...');
        } else {
            let result = '';
            while (true) {
                let word = splitedStr.shift();
                if ((result.length += word.length) <= n - 3) {
                    if (result==='') {
                        result +=  word;
                    }else{
                        result += ' ' + word;
                    }
                } else{
                    break;
                }
                
            }
            return result.concat('...');
        }
    }

    String.format = function (string) {

        for (let i = 1; i < arguments.length; i++) {
            string = string.replace(`{${i - 1}}`, arguments[i]);
        }
        return string;
    }
})();