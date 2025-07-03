<?php

namespace App\Controller;

use App\Repository\EntrepriseRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;

final class EntrepriseController extends AbstractController
{
    #[Route('/entreprise', name: 'app_entreprise')]
    public function index(EntrepriseRepository $entrepriseRepository): JsonResponse
    {
        $entreprises = $entrepriseRepository->findAll();

        $data = [];
        foreach ($entreprises as $entreprise) {
            $data[] = [
                'id' => $entreprise->getId(),
                'detail' => $entreprise->getDetail(),
                'raison_social' => $entreprise->getRaisonSocial(),
                'adresse' => $entreprise->getAdresse(),
                'code_postal' => $entreprise->getCodePostal(),
                'ville' => $entreprise->getVille(),
                'site_web' => $entreprise->getSiteWeb(),
                'detail_offre_ferme' => $entreprise->getDetailOffreFerme(),
                'category' => $entreprise->getCategory() ? $entreprise->getCategory()->getLibelle() : null,
                'logo' => $entreprise->getLogo(),];
        }

        return $this->json($data);
    }
}
