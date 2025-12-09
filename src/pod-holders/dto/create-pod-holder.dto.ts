import { IsOptional, IsString } from 'class-validator';

export class CreatePodHolderDto {
  @IsOptional()
  @IsString()
  serial_number?: string;

  @IsOptional()
  @IsString()
  model?: string;
}
