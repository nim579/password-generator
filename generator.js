var pass = {
    chars: {
        custom: null,
        upper: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
        lower: "abcdefghijklmnopqrstuvwxyz",
        nums: "0123456789",
        symbols: "!_@#$%&*[]+?"
    },
    order: {
        upper: true,
        lower: true,
        nums: true,
        symbols: false
    },
    opt: {
        genChars: 10
    },
    generate: function(){
        var chStr = '';
        if(this.order.upper) chStr += this.chars.upper;
        if(this.order.lower) chStr += this.chars.lower;
        if(this.order.nums) chStr += this.chars.nums;
        if(this.order.symbols) chStr += this.chars.symbols;
        if(this.chars.custom != null && this.chars.custom != '') chStr = this.chars.custom;
        if(chStr != '' && this.opt.genChars != ''){
            var chArr = chStr.split('');
            var passGenered = ''
            for(var i = 0; i<pass.opt.genChars; i++) {
                passGenered += chArr[Math.floor(Math.random()*chArr.length)] + '';
            }
            $('#alert').hide();
            $('#generated').val(passGenered);
        } else {
            $('#alert').show();
        }
    },
    init: function(){
        if(localStorage.order){
            this.order = JSON.parse(localStorage.order);
        }
        if(localStorage.custom){
            this.chars.custom = localStorage.custom;
        }
        if(localStorage.genChars){
            this.opt.genChars = localStorage.genChars;
        }
        if(this.order.upper){$('#upper').attr('checked','checked');} else {$('#upper').removeAttr('checked');}
        if(this.order.lower){$('#lower').attr('checked','checked');} else {$('#lower').removeAttr('checked');}
        if(this.order.nums){$('#nums').attr('checked','checked');} else {$('#nums').removeAttr('checked');}
        if(this.order.symbols){$('#symbols').attr('checked','checked');} else {$('#symbols').removeAttr('checked');}
        if(this.chars.custom != null && this.chars.custom != ''){
            $('#upper, #lower, #nums, #symbols').attr('disabled', 'disabled');
        }
        $('#chars').val(this.chars.custom);
        $('#len').val(this.opt.genChars);
        this.generate();
        this.listen();
    },
    listen: function() {
        $('#upper, #lower, #nums, #symbols').click(function() {
            pass.order.upper = $('#upper:checked').length;
            pass.order.lower = $('#lower:checked').length;
            pass.order.nums = $('#nums:checked').length;
            pass.order.symbols = $('#symbols:checked').length;
            localStorage.order = JSON.stringify({'upper': pass.order.upper, 'lower': pass.order.lower, 'nums': pass.order.nums, 'symbols': pass.order.symbols});
            pass.generate();
        });
        $('#chars').keyup(function(){
            pass.chars.custom = $(this).val();
            localStorage.custom = pass.chars.custom;
            if(pass.chars.custom != null && pass.chars.custom != ''){
                $('#upper, #lower, #nums, #symbols').attr('disabled', 'disabled');
            } else {
                $('#upper, #lower, #nums, #symbols').removeAttr('disabled');
            }
            pass.generate();
        });
        $('#len').keyup(function(){
            pass.opt.genChars = $(this).val();
            localStorage.genChars = pass.opt.genChars;
            pass.generate();
        });
        $('#bGen').click(function(){
            pass.generate();
        });
        $('#LSclear').click(function(){
            localStorage.genChars = ''; localStorage.order = ''; localStorage.custom = '';
            window.location.reload();
        });
        $('#generated').bind('focus', function(){
            $(this)[0].select();
        });
    }
}
$(function(){
    pass.init();
})