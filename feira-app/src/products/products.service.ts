import {BadRequestException, Injectable, NotFoundException} from '@nestjs/common';
import {CreateProductDto} from './dto/create-product.dto';
import {UpdateProductDto} from './dto/update-product.dto';
import {Repository} from "typeorm";
import {Product} from "./entities/product.entity";
import {InjectRepository} from "@nestjs/typeorm";

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private readonly repository: Repository<Product>) {}

  create(createProductDto: CreateProductDto) {
    const product = this.repository.save(createProductDto);
    return product;
  }

  findAll() {
    return this.repository.find();
  }

  findOne(id: number) {
    return this.repository.findOne({
      where: {
        id,
      },
    });
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    const product = this.repository.update(id, updateProductDto);
    return product;
  }

  async buy(id: number) {
    const product = await this.findOne(id);
    if (!product) {
      throw new NotFoundException('Produto não encontrado');
    }
    if (product.quantity <= 0) {
      throw new BadRequestException('Não há estoque disponível');
    }
    product.quantity -= 1;
    await this.repository.save(product);
    return product;
  }

  remove(id: number) {
    this.repository.delete(id);
    return {
      message: 'Produto removido com sucesso!',
    };
  }
}
