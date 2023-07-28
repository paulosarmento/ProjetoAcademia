/* eslint-disable prettier/prettier */
import { CheckInsRepository } from "../repositories/check-ins-repository";

interface GetUserMetricsUseCaseRequestUseCaseRequest {
  userId: string;
}
interface GetUserMetricsUseCaseRequestUseCaseResponse {
  checkInsCount: number;
}

export class GetUserMetricsUseCaseRequestUseCase {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async execute({
    userId,
  }: GetUserMetricsUseCaseRequestUseCaseRequest): Promise<GetUserMetricsUseCaseRequestUseCaseResponse> {
    const checkInsCount = await this.checkInsRepository.countByUserId(userId);

    return {
      checkInsCount,
    };
  }
}
