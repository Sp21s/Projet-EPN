<?php

namespace App\Controller;

use App\Repository\JobRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

class JobController extends AbstractController
{
    #[Route('/api/jobs', name: 'api_jobs', methods: ['GET'])]
    public function index(JobRepository $jobRepository): JsonResponse
    {
        $jobs = $jobRepository->findAll();

        $data = [];
        foreach ($jobs as $job) {
            $data[] = [
                'id' => $job->getId(),
                'detail' => $job->getDetail(),
                'raison_social' => $job->getRaisonSocial(),
                'adresse' => $job->getAdresse(),
                'code_postal' => $job->getCodePostal(),
                'ville' => $job->getVille(),
                'site_web' => $job->getSiteWeb(),
                'detail_offre_ferme' => $job->getDetailOffreFerme(),
                'category' => $job->getCategory() ? $job->getCategory()->getLibelle() : null,
            ];
        }

        return $this->json($data);
    }
}

