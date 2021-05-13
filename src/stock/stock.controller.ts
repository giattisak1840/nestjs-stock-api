import { Body, Controller, Delete, Get, Param, Post, Put, Query, UploadedFile, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ChangeStringCasePipe } from 'src/pipes/change-string-case.pipe';
import { CreateStockDto } from './dto/create-stock.dto';
import { StockService } from './stock.service';
import { diskStorage } from 'multer';
import * as fsExtra from 'fs-extra';
import { extname } from 'path';
import { LoggerInterceptor } from 'src/logger.interceptor';
import { AuthGuard } from '@nestjs/passport';

@Controller('stock')
@UseInterceptors(LoggerInterceptor)
@UseGuards(AuthGuard())
export class StockController {

    constructor(private stockService: StockService) {

    }

    @Get()
    getStocks(@Query('keyword') keyword: string) {
        return this.stockService.getProducts(keyword);
    }

    @Get(':id')
    getStockById(@Param('id') id: number) {
        return this.stockService.getProductById(id);
    }

    @Post()
    @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
            destination: './upload',
            filename: (req, file, cb) => {
                const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString());
                return cb(null, `${randomName}${extname(file.originalname)}`);
            }
        })
    }))
    @UsePipes(ValidationPipe)
    @UsePipes(new ChangeStringCasePipe())
    async addStock(@UploadedFile() file, @Body() createStockDto:CreateStockDto) {
        const product = await this.stockService.createProduct(createStockDto);
        const imageFile = product.id + extname(file.filename)
        fsExtra.move(file.path, `upload/${imageFile}`)
        product.image = imageFile
        await product.save()
        return product
        // return "55555"
    }

    @Delete(':id')
    deleteStockById(@Param('id') id: number) {
        return this.stockService.deleteProduct(id)
    }

    @Put(':id')
    @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
            destination: './upload',
            filename: (req, file, cb) => {
                const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString());
                return cb(null, `${randomName}${extname(file.originalname)}`);
            }
        })
    }))
    async updateStockById(@UploadedFile() file,@Param('id') id: number, @Body() createStcokDto:CreateStockDto) {
        const product = await this.stockService.updateProduct(id, createStcokDto)
        if (file) {
            fsExtra.remove(`upload/${product.image}`)
            const imageFile = id + extname(file.filename)
            fsExtra.move(file.path, `upload/${imageFile}`)
            product.image = imageFile;
            await product.save()
        }

        return product;
    }
}
