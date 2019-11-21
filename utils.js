export function isObject(target) {
    const type = typeof target;
    return target !== null && (type === 'object' || type === 'function');
}

export function getType(target) {
    return Object.prototype.toString.call(target);
}

export function getInit(target) {
    const Ctor = target.constructor;
    return new Ctor();
}

export function cloneSymbol(targe) {
    return Object(Symbol.prototype.valueOf.call(targe));
}

export function cloneReg(targe) {
    const reFlags = /\w*$/;
    const result = new targe.constructor(targe.source, reFlags.exec(targe));
    result.lastIndex = targe.lastIndex;
    return result;
}

export function cloneFunction(func) {
    const bodyReg = /(?<={)(.|\n)+(?=})/m;
    const paramReg = /(?<=\().+(?=\)\s+{)/;
    const funcString = func.toString();
    if (func.prototype) {
        const param = paramReg.exec(funcString);
        const body = bodyReg.exec(funcString);
        if (body) {
            if (param) {
                const paramArr = param[0].split(',');
                return new Function(...paramArr, body[0]);
            } else {
                return new Function(body[0]);
            }
        } else {
            return null;
        }
    } else {
        return eval(funcString);
    }
}

