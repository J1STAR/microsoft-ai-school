# azure.cognitiveservices.vision.customvision.training 라이브러리에서
# CustomVisionTrainingClient 클래스를 가져옵니다.
# 이 클래스는 Custom Vision 프로젝트의 학습 및 관리를 담당합니다.
from azure.cognitiveservices.vision.customvision.training import (
    CustomVisionTrainingClient,
)

# azure.cognitiveservices.vision.customvision.training.models 라이브러리에서
# Project, Domain, Tag 클래스를 가져옵니다.
# 이 클래스들은 Azure SDK가 API 응답으로 반환하는 각 객체의 타입을 명확히 하기 위해 사용됩니다.
from azure.cognitiveservices.vision.customvision.training.models import (
    Region,
    ImageFileCreateEntry,
    ImageFileCreateBatch,
    Project,
    Domain,
    Tag,
)

# azure.cognitiveservices.vision.customvision.prediction 라이브러리에서
# CustomVisionPredictionClient 클래스를 가져옵니다.
# 이 클래스는 학습된 모델을 사용하여 이미지를 예측하고 분류하는 역할을 합니다.
from azure.cognitiveservices.vision.customvision.prediction import (
    CustomVisionPredictionClient,
)

# msrest.authentication 라이브러리에서 ApiKeyCredentials 클래스를 가져옵니다.
# 이 클래스는 API 키를 사용하여 Azure 서비스에 안전하게 인증하는 기능을 제공합니다.
from msrest.authentication import ApiKeyCredentials


import os


class _Trainer:
    """
    Custom Vision Training API와 관련된 기능들을 캡슐화한 헬퍼 클래스입니다.
    프로젝트 생성, 태그 관리, 도메인 조회 등 학습과 관련된 모든 작업을 여기서 처리합니다.
    실제 Azure API 호출을 감싸고, 사용자 친화적인 출력과 반환값을 제공합니다.
    """

    def __init__(self, trainer_client: CustomVisionTrainingClient):
        """
        _Trainer 클래스의 인스턴스를 초기화합니다.

        Args:
            trainer_client (CustomVisionTrainingClient):
                실제 Azure Custom Vision 서비스와 통신하는 데 사용될
                공식 SDK의 Training 클라이언트 인스턴스입니다.
        """
        self._trainer_client = trainer_client

    def get_projects(self) -> list[Project]:
        """
        현재 Custom Vision 계정에 있는 모든 프로젝트 목록을 조회하고, 그 결과를 콘솔에 출력합니다.
        프로젝트가 하나도 없을 경우, "프로젝트가 존재하지 않습니다."라는 메시지를 표시합니다.

        Returns:
            list[Project]: 조회된 프로젝트 객체(Project)들의 리스트를 반환합니다.
                           이 리스트는 후속 작업에서 프로젝트 정보를 활용할 수 있도록 합니다.
        """
        print("Project List ]")
        # Azure SDK를 통해 실제 프로젝트 목록을 가져옵니다.
        projects = self._trainer_client.get_projects()
        if not projects:
            print("  프로젝트가 존재하지 않습니다.")
            return

        # 각 프로젝트의 상세 정보를 정해진 형식으로 출력합니다.
        for project in projects:
            print(
                f"  Project ID: {project.id} | Project Name: {project.name}"
                f"  Domain ID: {project.settings.domain_id}"
                "\n"
            )

        return projects

    def get_domains(self) -> list[Domain]:
        """
        Custom Vision에서 사용할 수 있는 모든 '도메인' 목록을 조회하고 콘솔에 출력합니다.
        '도메인'은 만들고자 하는 모델의 종류를 결정합니다 (예: 일반, 음식, 리테일 등).
        각 도메인은 특정 종류의 이미지 분류에 최적화되어 있습니다.

        Returns:
            list[Domain]: 조회된 도메인 객체(Domain)들의 리스트를 반환합니다.
        """
        print("Domain List ]")
        # Azure SDK를 통해 사용 가능한 도메인 목록을 가져옵니다.
        domains = self._trainer_client.get_domains()
        if not domains:
            print("  도메인이 존재하지 않습니다.")
            return

        # 각 도메인의 상세 정보를 정해진 형식으로 출력합니다.
        for domain in domains:
            print(f"  Domain ID: {domain.id} | {domain.name:<25} | {domain.type:<25}")
        print("\n")

        return domains

    def get_tags(self, project_id: str) -> list[Tag]:
        """
        특정 프로젝트 내에 생성된 모든 '태그' 목록을 조회하고 콘솔에 출력합니다.
        '태그'는 이미지를 분류하는 기준이 되는 라벨(카테고리)입니다.
        (예: '감자_정상', '감자_역병')

        Args:
            project_id (str): 태그를 조회할 프로젝트의 고유 ID입니다.

        Returns:
            list[Tag]: 조회된 태그 객체(Tag)들의 리스트를 반환합니다.
        """
        print("Tag List ]")
        # 특정 프로젝트 ID를 사용하여 Azure SDK로 태그 목록을 가져옵니다.
        tags = self._trainer_client.get_tags(project_id)
        for tag in tags:
            print(f"  Tag ID: {tag.id} | Tag Name: {tag.name}")
        print("\n")

        return tags

    def create_project(
        self,
        project_name: str,
        project_description: str,
        domain_name: str,
        domain_type: str = "Classification",
    ) -> Project:
        """
        새로운 Custom Vision 프로젝트를 생성합니다.
        만약 같은 이름의 프로젝트가 이미 존재한다면, 새로 만들지 않고 기존 프로젝트 정보를 반환합니다.

        Args:
            project_name (str): 생성할 프로젝트의 이름입니다. (예: "감자 잎 질병 분류")
            project_description (str): 프로젝트에 대한 간단한 설명입니다.
            domain_name (str): 프로젝트가 사용할 도메인의 이름입니다. (예: "General [A2]")
            domain_type (str, optional): 프로젝트의 도메인 타입입니다. 'Classification' 또는 'ObjectDetection'입니다. Defaults to "Classification".

        Returns:
            Project: 생성되었거나, 이미 존재하여 찾아낸 프로젝트의 객체(Project)를 반환합니다.
        """
        # 같은 이름의 프로젝트가 이미 있는지 먼저 확인합니다.
        if self._check_project_exists(project_name):
            print(f"  Project {project_name} already exists.")
            # 이미 존재한다면, 전체 프로젝트 목록에서 해당 프로젝트를 찾아냅니다.
            projects = self._trainer_client.get_projects()
            for target_project in projects:
                if target_project.name == project_name:
                    project = target_project
            print("Project Found ]")
        else:
            # 존재하지 않는다면, 새로운 프로젝트를 생성합니다.
            # 먼저 도메인 이름(예: "General [A2]")을 ID로 변환합니다.
            domain_id = self._get_domain_id_by_type_and_name(domain_type, domain_name)
            # Azure SDK를 호출하여 프로젝트를 실제로 생성합니다.
            project = self._trainer_client.create_project(
                project_name, project_description, domain_id, domain_type=domain_type
            )
            print("Project Created ]")

        # 최종적으로 얻어진 프로젝트의 정보를 출력합니다.
        print(f"  Project ID: {project.id} | Project Name: {project.name}")
        print(f"  Domain ID: {project.settings.domain_id}")
        print("\n")

        return project

    def create_tags(self, project_id: str, tag_names: list[str]) -> list[Tag]:
        """
        특정 프로젝트 내에 여러 개의 태그를 생성합니다.
        만약 같은 이름의 태그가 이미 존재한다면, 해당 태그는 건너뛰고 새로 만들지 않습니다.

        Args:
            project_id (str): 태그를 생성할 대상 프로젝트의 고유 ID입니다.
            tag_names (list[str]): 생성할 태그 이름들의 리스트입니다.

        Returns:
            list[Tag]: 최종적으로 프로젝트에 존재하는 태그 객체(Tag)들의 리스트를 반환합니다.
                       (새로 생성된 태그와 이미 존재하던 태그 모두 포함)
        """
        # 태그를 만들기 전, 현재 프로젝트에 어떤 태그들이 있는지 미리 조회합니다.
        # 이는 중복 생성을 방지하기 위함입니다.
        created_tags = self._trainer_client.get_tags(project_id)

        print("Tag Create ]")

        # 최종적으로 반환할 태그 객체(Tag)들을 담을 리스트로, 기존에 존재하던 태그들로 초기화합니다.
        tags = created_tags
        # 빠른 조회를 위해, 미리 조회한 '이미 생성된 태그'들의 이름만 따로 리스트로 만듭니다.
        created_tag_names = list(map(lambda tag: tag.name, created_tags))

        # 요청된 태그 목록 중 이미 존재하는 태그에 대한 알림을 출력합니다.
        for tag_name in tag_names:
            if tag_name in created_tag_names:
                print(f"  Tag {tag_name} already exists.")

        # 생성 요청된 태그 목록에서, 이미 존재하는 태그들을 제거하여
        # 순수하게 새로 생성해야 할 태그 목록만 남깁니다.
        for tag_name in created_tag_names:
            if tag_name in tag_names:
                tag_names.pop(tag_names.index(tag_name))

        # 새로 생성해야 할 태그 목록을 순회합니다.
        for tag_name in tag_names:
            # 존재하지 않는 태그라면 Azure SDK를 통해 새로 생성합니다.
            tag = self._trainer_client.create_tag(project_id, tag_name)
            print(f"  Tag ID: {tag.id} | Tag Name: {tag.name}")
            # 새로 생성한 태그 '객체'를 반환할 리스트('tags')에 추가합니다.
            tags.append(tag)
        print("\n")

        # 최종적으로 처리된 태그 목록과 개수를 출력합니다.
        # 'tags' 리스트는 Tag 객체를 담고 있으므로, .name으로 이름에 접근하여 출력합니다.
        print(f"  Tags: {list(map(lambda tag: tag.name, tags))}, Total: {len(tags)}")

        return tags

    def upload_images(self, project_id: str, images_data: list[dict]) -> any:
        """
        다수의 로컬 이미지 파일들을 Custom Vision 프로젝트에 일괄적으로 업로드합니다.

        이 함수는 단순한 파일 업로드를 넘어, 각 이미지에 대한 메타데이터(태그, 영역 정보)까지
        함께 처리하는 복합적인 기능을 수행합니다. 객체 탐지(Object Detection)를 위한
        영역(Region) 정보가 있는 이미지와, 단순 이미지 분류(Classification)를 위한
        태그 정보만 있는 이미지를 모두 처리할 수 있습니다.

        내부적으로는 다음과 같은 단계로 동작합니다:
        1. 프로젝트에 이미 존재하는 모든 태그 정보를 미리 가져와 이름-ID 맵을 만듭니다. (API 호출 최소화)
        2. `images_data` 리스트의 각 항목을 순회하며 업로드에 필요한 'ImageFileCreateEntry' 객체를 생성합니다.
           - 이 과정에서 태그 이름을 태그 ID로 변환합니다.
           - 이미지 파일을 열어 바이너리 데이터로 읽습니다.
        3. 준비된 모든 이미지 엔트리들을 하나의 '배치(Batch)'로 묶습니다.
        4. Custom Vision SDK의 `create_images_from_files`를 호출하여 배치를 한 번에 업로드합니다.

        Args:
            project_id (str): 이미지를 업로드할 대상 프로젝트의 고유 ID입니다.
            images_data (list[dict]): 업로드할 이미지들의 정보를 담고 있는 딕셔너리들의 리스트.
                각 딕셔너리는 다음과 같은 키-값 쌍을 가질 수 있습니다:
                - "path" (str, 필수): 이미지 파일의 로컬 시스템 전체 경로.
                - "regions" (list[dict], 선택): 객체 탐지를 위한 영역 정보 리스트.
                    각 영역 딕셔너리는 "tag_name", "left", "top", "width", "height" 키를 가집니다.
                    이 값이 없으면 단순 이미지 분류용으로 처리됩니다.
                - "tags" (list[str], 선택): 이미지 분류를 위한 태그 이름 리스트.
        Returns:
            ImageCreateSummary: 업로드 작업의 성공 여부, 생성된 이미지 수 등의 요약 정보를 담은 객체.
        """
        print("Preparing images for upload...")
        # 1. API 호출을 최소화하기 위해, 프로젝트의 모든 태그 정보를 미리 한번만 조회합니다.
        #    그리고 태그 이름을 키로, 태그 ID를 값으로 갖는 딕셔너리(해시맵)를 만들어 둡니다.
        #    이렇게 하면 반복문 안에서 태그 ID를 찾을 때 매번 API를 호출할 필요 없이 빠르고 효율적으로 조회할 수 있습니다.
        project_tags = self.get_tags(project_id)
        tag_name_to_id_map = {tag.name: tag.id for tag in project_tags}

        # 2. 업로드할 각 이미지의 정보를 담을 'ImageFileCreateEntry' 객체 리스트를 준비합니다.
        image_file_create_entries = []

        # 사용자로부터 전달받은 이미지 데이터 목록을 하나씩 순회합니다.
        for image_data in images_data:
            image_path = image_data["path"]
            # .get() 메서드를 사용하여 키가 없는 경우에도 오류 없이 안전하게 값을 가져옵니다.
            image_regions = image_data.get("regions")  # 객체 탐지용 영역 정보
            image_tags = image_data.get("tags")  # 이미지 분류용 태그 정보

            # --- 객체 탐지(Object Detection)를 위한 영역 정보 처리 ---
            regions_for_entry = []
            if image_regions:  # 영역 정보가 있을 경우에만 이 블록을 실행합니다.
                for region_data in image_regions:
                    tag_name = region_data["tag_name"]
                    tag_id = tag_name_to_id_map.get(
                        tag_name
                    )  # 미리 만들어 둔 맵에서 태그 ID를 찾습니다.
                    if tag_id:  # 유효한 태그 ID를 찾은 경우에만
                        # SDK가 요구하는 Region 객체를 생성하여 리스트에 추가합니다.
                        regions_for_entry.append(
                            Region(
                                tag_id=tag_id,
                                left=region_data["left"],
                                top=region_data["top"],
                                width=region_data["width"],
                                height=region_data["height"],
                            )
                        )

            # --- 이미지 분류(Classification)를 위한 태그 정보 처리 ---
            tag_ids_for_entry = []
            if image_tags:  # 태그 정보가 있을 경우에만 이 블록을 실행합니다.
                for tag_name in image_tags:
                    tag_id = tag_name_to_id_map.get(tag_name)
                    if tag_id:
                        tag_ids_for_entry.append(tag_id)

            # 3. 이미지 파일을 바이너리('rb') 모드로 엽니다.
            #    'with' 구문을 사용하면 파일 작업 후 자동으로 파일을 닫아주므로 안전합니다.
            with open(image_path, "rb") as image_contents:
                # 최종적으로 SDK에 전달할 ImageFileCreateEntry 객체를 생성합니다.
                image_file_create_entries.append(
                    ImageFileCreateEntry(
                        name=os.path.basename(image_path),  # 파일 경로에서 이름만 추출
                        contents=image_contents.read(),  # 파일의 전체 바이너리 데이터
                        regions=regions_for_entry
                        if regions_for_entry
                        else None,  # 영역 정보 (없으면 None)
                        tag_ids=tag_ids_for_entry
                        if tag_ids_for_entry
                        else None,  # 태그 ID 리스트 (없으면 None)
                    )
                )

        print(f"Uploading {len(image_file_create_entries)} images in a batch...")
        # 4. 준비된 모든 이미지 엔트리들을 하나의 '배치(Batch)'로 묶습니다.
        #    네트워크 통신 횟수를 줄여 업로드 효율을 높이는 방법입니다.
        batch = ImageFileCreateBatch(images=image_file_create_entries)

        # Custom Vision SDK를 호출하여 이미지 배치를 프로젝트에 업로드합니다.
        upload_result = self._trainer_client.create_images_from_files(project_id, batch)
        print("Upload completed.")
        return upload_result

    def train(self, project_id: str) -> any:
        """
        지정된 프로젝트에 대해 새로운 학습 반복(iteration)을 시작합니다.
        이 함수를 호출하면 Custom Vision 서비스가 업로드된 이미지와 태그를 기반으로 모델 학습을 시작합니다.
        학습은 서비스 상태에 따라 시간이 걸릴 수 있습니다.

        Args:
            project_id (str): 학습을 시작할 프로젝트의 고유 ID입니다.

        Returns:
            any: 시작된 학습 반복(Iteration 객체)에 대한 정보를 반환합니다.
        """
        print("Starting training...")
        result = self._trainer_client.train_project(project_id)
        print("Training started.")
        return result

    def get_iterations(self, project_id: str) -> any:
        """
        특정 프로젝트에 대한 모든 학습 반복(Iteration) 목록을 조회합니다.
        각 Iteration은 모델의 특정 버전을 의미하며, 이를 통해 학습 과정을 추적할 수 있습니다.

        Args:
            project_id (str): 조회할 프로젝트의 고유 ID입니다.

        Returns:
            any: 해당 프로젝트의 모든 Iteration 객체 리스트를 반환합니다.
        """
        print(f"Getting iterations for project {project_id}...")
        iterations = self._trainer_client.get_iterations(project_id)
        return iterations

    def get_iteration(self, project_id: str, iteration_id: str) -> any:
        """
        특정 학습 반복(Iteration)의 현재 상태 및 상세 정보를 조회합니다.
        학습이 완료되었는지, 혹은 아직 진행 중인지 확인할 때 사용됩니다.

        Args:
            project_id (str): 조회할 프로젝트의 고유 ID입니다.
            iteration_id (str): 상태를 확인할 특정 Iteration의 고유 ID입니다.

        Returns:
            any: 해당 Iteration 객체를 반환합니다.
        """
        iteration = self._trainer_client.get_iteration(project_id, iteration_id)
        return iteration

    def publish(
        self,
        project_id: str,
        iteration_id: str,
        publish_name: str,
        prediction_id: str = None,
    ) -> any:
        """
        학습이 완료된 특정 Iteration을 '게시(Publish)'하여 예측에 사용할 수 있도록 준비합니다.
        게시된 모델은 고유한 '게시 이름(publish_name)'을 가지게 되며,
        이 이름을 통해 예측 API에서 모델을 호출할 수 있습니다.

        Args:
            project_id (str): 게시할 모델이 포함된 프로젝트의 고유 ID입니다.
            iteration_id (str): 게시할 특정 Iteration의 고유 ID입니다.
            publish_name (str): 예측 시 사용할 모델의 고유한 이름입니다. (예: "MyKitchenModel-v1")
            prediction_id (str, optional): 예측 리소스의 ID. Defaults to None.

        Returns:
            any: 게시 작업의 성공 여부 등 결과 정보를 담은 객체를 반환합니다.
        """
        print(f"Publishing iteration {iteration_id} as '{publish_name}'...")
        result = self._trainer_client.publish_iteration(
            project_id, iteration_id, publish_name, prediction_id
        )
        print("Publish completed.")
        return result

    def _get_domain_id_by_type_and_name(
        self, domain_type: str, domain_name: str
    ) -> str:
        """
        (내부 헬퍼 메서드) 도메인 타입(예: "Classification", "ObjectDetection")과
        도메인의 이름(예: "General [A2]")을 받아서
        Azure API가 요구하는 고유 ID(GUID 형태)로 변환합니다.

        Args:
            domain_type (str): 찾고자 하는 도메인의 타입입니다.
            domain_name (str): 찾고자 하는 도메인의 이름입니다.

        Returns:
            str: 찾아낸 도메인의 고유 ID를 반환합니다. 찾지 못하면 None을 반환합니다.
        """
        domains = self._trainer_client.get_domains()
        for domain in domains:
            if domain.type == domain_type and domain.name == domain_name:
                return domain.id
        return None

    def _check_project_exists(self, project_name: str) -> bool:
        """
        (내부 헬퍼 메서드) 주어진 이름의 프로젝트가 Custom Vision 서비스에
        이미 존재하는지 여부를 확인합니다.

        Args:
            project_name (str): 존재 여부를 확인할 프로젝트의 이름입니다.

        Returns:
            bool: 프로젝트가 존재하면 True, 존재하지 않으면 False를 반환합니다.
        """
        projects = self._trainer_client.get_projects()
        for project in projects:
            if project.name == project_name:
                return True
        return False


class _Predictor:
    """
    Custom Vision Prediction API와 관련된 기능들을 캡슐화한 헬퍼 클래스입니다.
    학습되고 게시된 모델을 사용하여 새로운 이미지에 대한 예측을 수행하는 역할을 합니다.
    """

    def __init__(self, predictor_client: CustomVisionPredictionClient):
        """
        _Predictor 클래스의 인스턴스를 초기화합니다.

        Args:
            predictor_client (CustomVisionPredictionClient):
                실제 Azure Custom Vision 예측 서비스와 통신하는 데 사용될
                공식 SDK의 Prediction 클라이언트 인스턴스입니다.
        """
        self._predictor_client = predictor_client

    def predict_using_image_url(
        self, project_id: str, published_name: str, image_url: str
    ) -> any:
        """
        웹에 있는 이미지의 URL을 사용하여 객체 탐지 또는 이미지 분류 예측을 수행합니다.

        Args:
            project_id (str): 사용할 모델이 포함된 프로젝트의 고유 ID입니다.
            published_name (str): 예측에 사용할 게시된 모델의 이름입니다.
            image_url (str): 예측할 이미지가 있는 공개된 웹 주소(URL)입니다.

        Returns:
            any: 예측 결과를 담은 객체. 객체 탐지의 경우, 바운딩 박스와 태그 정보 등이 포함됩니다.
        """
        print(f"Predicting from URL: {image_url}")
        result = self._predictor_client.detect_image_url(
            project_id, published_name, image_url
        )
        return result

    def predict_using_image_data(
        self, project_id: str, published_name: str, image_data: bytes
    ) -> any:
        """이미지 파일의 바이너리 데이터를 사용하여 객체 탐지 또는 이미지 분류 예측을 수행합니다.

        Args:
            project_id (str): 사용할 모델이 포함된 프로젝트의 고유 ID입니다.
            published_name (str): 예측에 사용할 게시된 모델의 이름입니다.
            image_data (bytes): 예측할 이미지의 바이너리 데이터입니다.

        Returns:
            any: 예측 결과를 담은 객체. 객체 탐지의 경우, 바운딩 박스와 태그 정보 등이 포함됩니다.
        """
        print("Predicting from image data...")
        result = self._predictor_client.detect_image(
            project_id, published_name, image_data
        )
        return result


class CustomVisionService:
    """
    Azure Custom Vision Service와의 상호작용을 총괄하는 메인 서비스 클래스입니다.
    이 클래스는 '학습(Training)'과 '예측(Prediction)'에 필요한 모든 기능을 포함하며,
    사용자가 서비스의 세부 구현을 몰라도 쉽게 사용할 수 있도록 돕습니다.
    """

    def __init__(
        self,
        training_endpoint: str,
        prediction_endpoint: str,
        training_key: str,
        prediction_key: str,
    ):
        """
        CustomVisionService 클래스의 인스턴스를 초기화합니다.
        이 과정에서 학습 및 예측 클라이언트를 설정하고 인증을 처리합니다.

        Args:
            training_endpoint (str): 학습 API의 고유한 웹 주소(URL)입니다.
            prediction_endpoint (str): 예측 API의 고유한 웹 주소(URL)입니다.
            training_key (str): 학습 API에 접근하기 위한 비밀 키입니다.
            prediction_key (str): 예측 API에 접근하기 위한 비밀 키입니다.
        """
        # 학습 API에 사용될 인증 정보를 생성합니다.
        self.__training_credentials = ApiKeyCredentials(
            in_headers={"Training-key": training_key}
        )
        # 예측 API에 사용될 인증 정보를 생성합니다.
        self.__prediction_credentials = ApiKeyCredentials(
            in_headers={"Prediction-key": prediction_key}
        )

        # 인증 정보를 사용하여 실제 학습 클라이언트 객체를 생성합니다.
        self.__trainer_client = CustomVisionTrainingClient(
            training_endpoint, self.__training_credentials
        )
        # 인증 정보를 사용하여 실제 예측 클라이언트 객체를 생성합니다.
        self.__predictor_client = CustomVisionPredictionClient(
            prediction_endpoint, self.__prediction_credentials
        )

        # 위에서 정의한 _Trainer 헬퍼 클래스의 인스턴스를 생성하여,
        # 학습 관련 기능들을 그룹화하고 사용하기 쉽게 만듭니다.
        self._trainer = _Trainer(self.__trainer_client)
        # 예측 관련 기능들을 그룹화하고 사용하기 쉽게 만듭니다.
        self._predictor = _Predictor(self.__predictor_client)

    @property
    def trainer(self) -> _Trainer:
        """
        학습 관련 기능(_Trainer 클래스 인스턴스)을 외부에 제공하는 속성(property)입니다.
        이를 통해 `service.trainer.create_project()` 와 같은 직관적인 코드를 사용할 수 있습니다.

        Returns:
            _Trainer: 학습 관련 메서드들이 구현된 _Trainer 객체를 반환합니다.
        """
        return self._trainer

    @property
    def predictor(self) -> _Predictor:
        """
        예측 관련 기능(_Predictor 클래스 인스턴스)을 외부에 제공하는 속성(property)입니다.
        이를 통해 `service.predictor.predict_using_image_url()` 와 같은 직관적인 코드를 사용할 수 있습니다.

        Returns:
            _Predictor: 예측 관련 메서드들이 구현된 _Predictor 객체를 반환합니다.
        """
        return self._predictor
