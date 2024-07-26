import { ArgumentMetadata, BadRequestException, PipeTransform } from "@nestjs/common";

export class ItemParamPipe implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata) {
        // metadata: 데이터를 설명하는 데이터
        // console.log(metadata)
        // console.log(value)
        // console.log(isNaN(value))
        // isNaN : 문자 false 숫자 true
        if(isNaN(value)) {
            throw new BadRequestException("타입이 문자로 잘못 전달됐어")
        }
        return parseInt(value);
    }
}